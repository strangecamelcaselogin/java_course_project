package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


/**
 * Тут наша реализация некоторых методов для репозитория.
 * Использовать их будем все равно через ClientRepository
 */
@Component
public class ClientRepositoryImpl implements ClientRepositoryCustom {
    @Autowired
    private ClientRepository clientRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Client findById(Long id) {
        Client client = clientRepository.findOne(id);

        if (client == null) {
            throw new ResourceNotFound(id, "Client Not Found");
        }
        return client;
    }

    @Override
    public Client findByEmail(String email) {
        Client c = (Client) em.createQuery(
                "SELECT c FROM Client c WHERE c.email = ?1")
                .setParameter(1, email).getSingleResult();

        if (c == null) {
            throw new ResourceNotFound(null, "Client Not Found");
        }

        return c;
    }

    public List<Client> getClientsWithBrand(CarBrand brand) {
        return em.createQuery(
                "SELECT c FROM Car car INNER JOIN car.client c WHERE car.carBrand = ?1")
                .setParameter(1, brand)
                .getResultList();
    }
}
