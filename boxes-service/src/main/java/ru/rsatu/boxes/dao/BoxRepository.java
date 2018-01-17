package ru.rsatu.boxes.dao;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.Box;

@Repository
public interface BoxRepository extends CrudRepository<Box, Long>, BoxRepositoryCustom {

}
