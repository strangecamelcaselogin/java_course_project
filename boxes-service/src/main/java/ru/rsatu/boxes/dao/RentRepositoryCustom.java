package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.persistence.Rent;

public interface RentRepositoryCustom {
    Iterable<Rent> findByClient(Client client);
    Rent findActiveByCar(Car car);
    Rent findActiveByBox(Box box);
    Rent findById(Long id);
}
