package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.persistence.Rent;

public interface RentRepositoryCustom {
    Iterable<Rent> findByClient(Client client);
}
