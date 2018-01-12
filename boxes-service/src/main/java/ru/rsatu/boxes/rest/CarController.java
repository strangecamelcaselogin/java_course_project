package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.domain.Car;

@RestController
@RequestMapping("/cars")
public class CarController extends ApiController {
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
        return carRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Car postCars(@RequestParam String number, @RequestParam Long carBrandId) {

        // TODO валидировать номер
        Car car = new Car(
                clientRepository.findOne( 1L),
                carBrandRepository.findOne(carBrandId),
                number
        );

        carRepository.save(car);

        return car;
    }

    // TODO DELETE
}
