package ru.rsatu.boxes.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.Client;


@Repository
public interface ClientRepository extends CrudRepository<Client, Long>, ClientRepositoryCustom {
}