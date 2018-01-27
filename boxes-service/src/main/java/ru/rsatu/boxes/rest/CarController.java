package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.rest.security.UserRole;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.dto.CarDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.Conflict;

import java.security.Principal;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarRepository carRepository;
    private final CarBrandRepository carBrandRepository;
    private final ClientRepository clientRepository;

    private DomainToDTOMapper<CarDTO> carDTOMapper = new DomainToDTOMapper<>(CarDTO.class);

    public CarController(CarRepository carRepository, CarBrandRepository carBrandRepository, ClientRepository clientRepository) {
        this.carRepository = carRepository;
        this.carBrandRepository = carBrandRepository;
        this.clientRepository = clientRepository;
    }

    /**
     * Все машины получить может только админ
     * Иначе возвращать машины только того пользователя, который спрашивает
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarDTO> getCars(Principal auth) {
        String email = auth.getName();
        UserRole userRole = new UserRole(email);

        if (userRole.isAdmin()) {
            return carDTOMapper.mapMany(carRepository.findAll());
        }
        else {
            Client client = clientRepository.findByEmail(email);
            return carDTOMapper.mapMany(carRepository.findAllByClient(client));
        }
    }

    /**
     * Информация о конкретном автомобиле
     * Доступ имеет только владелец автомобиля и админ
     */
    @RequestMapping(value = "/{carId}", method = RequestMethod.GET)
    @Transactional
    public CarDTO getCar(Principal auth, @PathVariable Long carId) {

        String email = auth.getName();
        UserRole userRole = new UserRole(email);

        Client client = clientRepository.findByEmail(email);

        Car car = carRepository.findById(carId);
        if (userRole.isAdmin() || car.getClient().getId().equals(client.getId())) {
            return carDTOMapper.mapOne(car);
        }
        else {
            throw new AccessViolation();
        }
    }

    /**
     * Получить информацию о автомобилях клиента
     * Доступ имеет только админ
     */
    @RequestMapping(value = "/client/{clientId}", method = RequestMethod.GET)
    public Iterable<CarDTO> getClientCars(Principal auth, @PathVariable Long clientId) {
        new AccessChecker(auth).onlyAdmin();

        Client user = clientRepository.findById(clientId);

        return carDTOMapper.mapMany(carRepository.findAllByClient(user));
    }

    /**
     * Добавление автомобиля
     * TODO валидировать номер
     * @param number - номер автомобиля
     * @param carBrandId - id марки
     */
    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public CarDTO postCars(Principal auth, @RequestParam String number, @RequestParam Long carBrandId) {

        String username = auth.getName();

        Client client = clientRepository.findByEmail(username);
        CarBrand carBrand = carBrandRepository.findById(carBrandId);

        Car car = new Car(client, carBrand, number);

        try {
            carRepository.save(car);
        } catch (DataIntegrityViolationException e) {
            throw new Conflict("Car number already taken");
        }

        return carDTOMapper.mapOne(car);
    }

    /**
     * Удалить автомобиль
     * Может только владелец
     */
    @RequestMapping(value = "/{carId}", method = RequestMethod.DELETE)
    @Transactional
    public Boolean deleteCar(Principal auth, @PathVariable Long carId) {

        Client owner = clientRepository.findByEmail(auth.getName());
        Car car = carRepository.findById(carId);

        if (!car.getClient().getId().equals(owner.getId())) {
            throw new AccessViolation("Client can not delete this Car");
        }

        try {
            carRepository.delete(carId);
        } catch(EmptyResultDataAccessException e){
            throw new BadRequest("Error while deleting car");
        }

        return true;
    }
}
