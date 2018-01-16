package ru.rsatu.boxes.dao;

import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.domain.Box;

public interface RentRepository  extends CrudRepository<Box, Long> {
}
