package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.dto.CarDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

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

    // TODO все машины получить может только админ
    // TODO иначе возвращать машины только того пользователя, который спрашивает
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarDTO> getCars() {
        return carDTOMapper.mapMany(carRepository.findAll());
    }

    // TODO доступ имеет только владелец автомобиля
    @RequestMapping(value = "/{carId}", method = RequestMethod.GET)
    public CarDTO getCar(@PathVariable Long carId) {
        return carDTOMapper.mapOne(carRepository.findOne(carId));  // TODO исключения
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarDTO postCars(@RequestParam String number, @RequestParam Long carBrandId) {

        Long clientId = 1L;

        Client client = clientRepository.findOne(clientId);
        CarBrand carBrand = carBrandRepository.findOne(carBrandId);

        if (client == null) {
            throw new ResourceNotFoundException(clientId, "Client Not Found");
        }
        if (carBrand == null) {
            throw new ResourceNotFoundException(carBrandId, "Car Brand Not Found");
        }

        // TODO валидировать номер
        Car car = new Car(
                clientRepository.findOne( 1L),
                carBrandRepository.findOne(carBrandId),
                number
        );

        carRepository.save(car);  // todo DataIntegrityViolationException из-за не уникальных номеров

        return carDTOMapper.mapOne(car);
    }

    // TODO может только владелец
    @RequestMapping(value = "/{carId}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteCar(@PathVariable Long carId) {
        try {
            carRepository.delete(carId);
        } catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
