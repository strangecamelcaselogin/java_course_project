package ru.rsatu.boxes.dao;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.domain.Client;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    List<Client> findById(Long id);
}