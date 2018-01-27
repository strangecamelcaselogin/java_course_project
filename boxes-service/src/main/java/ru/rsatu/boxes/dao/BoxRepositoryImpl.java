package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class BoxRepositoryImpl implements BoxRepositoryCustom {
    @Autowired
    private BoxRepository boxRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Box findFreeBox(CarBrand brand) throws IndexOutOfBoundsException {
        try {
            Box freeBox = (Box) em.createQuery(
                    "SELECT b FROM Box b " +
                            "WHERE b.carBrand = ?1 AND b NOT IN" +
                            "(SELECT r.box FROM Rent r WHERE r.active = true)")
                    .setParameter(1, brand)
                    .getResultList().get(0);

            return freeBox;
        } catch (IndexOutOfBoundsException e) {
            throw new ResourceNotFound(null, "Can not Find Free Box");
        }
    }

    @Override
    public Box findByClient(Client client) {
        return null;  // TODO
    }

    @Override
    public List<Box> findFreeBoxes() {
        return em.createQuery(
                "SELECT b FROM Box b " +
                        "WHERE b NOT IN" +
                        "(SELECT r.box FROM Rent r WHERE r.active = false)")
                .getResultList();
    }

    @Override
    public Box findById(Long id) {
        Box b = boxRepository.findOne(id);

        if (b == null) {
            throw new ResourceNotFound(id,"Box Not Found");
        }

        return b;
    }
}
