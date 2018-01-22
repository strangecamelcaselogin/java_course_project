package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.persistence.Rent;

public interface RentRepositoryCustom {
    Iterable<Rent> findByClient(Client client);
    Rent findByCar(Car car);
    Rent findById(Long id);
}
