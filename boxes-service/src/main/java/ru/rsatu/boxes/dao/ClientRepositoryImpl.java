package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import ru.rsatu.boxes.domain.Client;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * Тут наша реализация некоторых методов для репозитория.
 * Использовать их будем все равно через ClientRepository
 */
public class ClientRepositoryImpl implements ClientRepositoryCustom {
    @Autowired
    private ClientRepository clientRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Client findById(Long id) {
        Client client = clientRepository.findOne(id);

        if (client == null) {
            throw new ResourceNotFoundException(id, "Client Not Found");
        }
        return client;
    }
}
