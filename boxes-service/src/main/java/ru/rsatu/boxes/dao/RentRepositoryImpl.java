package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.persistence.Rent;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class RentRepositoryImpl implements RentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    public Iterable<Rent> findByClient(Client client) {
        return em.createQuery(
                "SELECT r " +
                        "FROM Rent r, Car car " +
                        "WHERE r.car = car.id AND car.client = ?1")
                .setParameter(1, client)
                .getResultList();
    }
}
