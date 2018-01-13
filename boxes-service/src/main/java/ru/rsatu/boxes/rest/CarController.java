package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.domain.Car;
import ru.rsatu.boxes.domain.CarBrand;
import ru.rsatu.boxes.domain.Client;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarRepository carRepository;
    private final CarBrandRepository carBrandRepository;
    private final ClientRepository clientRepository;

    public CarController(CarRepository carRepository, CarBrandRepository carBrandRepository, ClientRepository clientRepository) {
        this.carRepository = carRepository;
        this.carBrandRepository = carBrandRepository;
        this.clientRepository = clientRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Car> getCars() {
        // TODO возвращать машины только того пользователя, который спрашивает
        return carRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Car postCars(@RequestParam String number, @RequestParam Long carBrandId) {

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

        return car;
    }

    // TODO DELETE
}
