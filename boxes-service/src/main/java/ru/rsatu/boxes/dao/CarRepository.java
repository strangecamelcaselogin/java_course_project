package ru.rsatu.boxes.dao;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.Client;

@Repository
public interface CarRepository extends CrudRepository<Car, Long>, CarRepositoryCustom {
    Car findByClient(Client client);
    Iterable<Car> findAllByClient(Client client);
}
