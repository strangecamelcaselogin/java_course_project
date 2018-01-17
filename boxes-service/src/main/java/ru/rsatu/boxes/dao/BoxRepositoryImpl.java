package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class BoxRepositoryImpl implements BoxRepositoryCustom {
    @Autowired
    private BoxRepository boxRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Box findFreeBox(CarBrand brand) {
        return (Box) em.createQuery(
                "SELECT b FROM Box b " +
                        "WHERE b.carBrand = ?1 AND b NOT IN" +
                        "(SELECT r.box FROM Rent r)")
                .setParameter(1, brand)
                .getResultList()
                .get(0); //TODO ловить пустой массив - IndexOutOfBoundsException
    }
}
