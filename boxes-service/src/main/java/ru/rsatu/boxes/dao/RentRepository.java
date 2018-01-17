package ru.rsatu.boxes.dao;

import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.Rent;

public interface RentRepository  extends CrudRepository<Rent, Long> {
}
