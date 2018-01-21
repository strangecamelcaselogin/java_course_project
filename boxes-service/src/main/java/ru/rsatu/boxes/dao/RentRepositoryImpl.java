package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Iterable<Rent> findByClient(Client client) {
        return em.createQuery(
                "SELECT r " +
                        "FROM Rent r, Car car " +
                        "WHERE r.car = car.id AND car.client = ?1")
                .setParameter(1, client)
                .getResultList();
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
