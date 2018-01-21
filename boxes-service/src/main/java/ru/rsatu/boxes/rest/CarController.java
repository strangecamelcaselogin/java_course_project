package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.rest.security.UserRole;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.dto.CarDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.Conflict;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

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
     * Доступ имеет только владелец автомобиля и админ
     */
    @RequestMapping(value = "/{carId}", method = RequestMethod.GET)
    public CarDTO getCar(Principal auth, @PathVariable Long carId) {
        String email = auth.getName();
        UserRole userRole = new UserRole(email);
        Client client = clientRepository.findByEmail(email);

        Car car = carRepository.findOne(carId);

        if (car == null) {
            throw new ResourceNotFound(carId, "Car Not Found");
        }

        if (userRole.isAdmin() || car.getClient().getId().equals(client.getId())) {
            return carDTOMapper.mapOne(carRepository.findOne(carId));  // TODO исключения
        }
        else {
            throw new AccessViolation();
        }
    }

    /**
     * Добавление автомобиля
     * TODO валидировать номер
     * @param number - номер автомобиля
     * @param carBrandId - id марки
     */
    @RequestMapping(method = RequestMethod.POST)
    public CarDTO postCars(Principal auth, @RequestParam String number, @RequestParam Long carBrandId) {

        String username = auth.getName();

        Client client = clientRepository.findByEmail(username);
        CarBrand carBrand = carBrandRepository.findOne(carBrandId);

        if (client == null) {
            throw new ResourceNotFound(null, "Client Not Found");
        }
        if (carBrand == null) {
            throw new ResourceNotFound(carBrandId, "Car Brand Not Found");
        }

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
    public ResponseEntity<Boolean> deleteCar(Principal auth, @PathVariable Long carId) {
        Client owner = clientRepository.findByEmail(auth.getName());
        Car car = carRepository.findOne(carId);

        if (car == null) {
            throw new ResourceNotFound(carId, "Car Not Found");
        }

        if (!car.getClient().getId().equals(owner.getId())) {
            throw new AccessViolation("Client can not delete this Car");
        }

        try {
            carRepository.delete(carId);
        } catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
