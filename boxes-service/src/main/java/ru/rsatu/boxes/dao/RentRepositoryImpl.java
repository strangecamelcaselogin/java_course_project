package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.persistence.Rent;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class RentRepositoryImpl implements RentRepositoryCustom {

    @Autowired
    private RentRepository rentRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Iterable<Rent> findByClient(Client client) {
        return em.createQuery(
                "SELECT r " +
                        "FROM Rent r, Car car " +
                        "WHERE r.car = car.id AND car.client = ?1")
                .setParameter(1, client)
                .getResultList();
    }

    @Override
    public Rent findActiveByCar(Car car) {
        return (Rent) em.createQuery(
                "SELECT r " +
                        "FROM Rent r " +
                        "WHERE r.car = ?1 and r.active = true")
                .setParameter(1, car)
                .getSingleResult();
    }

    @Override
    public Rent findActiveByBox(Box box) {
        return (Rent) em.createQuery(
                "SELECT r " +
                        "FROM Rent r " +
                        "WHERE r.box = ?1 and r.active = true")
                .setParameter(1, box)
                .getSingleResult();
    }

    @Override
    public Rent findById(Long id) {
        Rent rent = rentRepository.findOne(id);

        if (rent == null) {
            throw new ResourceNotFound(id,"Rent Not Found");
        }

        return rent;
    }
}
