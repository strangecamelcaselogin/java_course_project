package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


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
}
