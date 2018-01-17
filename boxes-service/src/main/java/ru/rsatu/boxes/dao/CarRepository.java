package ru.rsatu.boxes.dao;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.Car;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {
}
