package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

@Component
public class CarRepositoryImpl implements CarRepositoryCustom {
    @Autowired
    private CarRepository carRepository;

    @Override
    public Car findById(Long id) {
        Car car = carRepository.findOne(id);

        if (car == null) {
            throw new ResourceNotFound(id, "Car Not Found");
        }

        return car;
    }
}
