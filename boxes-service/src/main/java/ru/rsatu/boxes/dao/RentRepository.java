package ru.rsatu.boxes.dao;

import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.domain.Rent;

public interface RentRepository  extends CrudRepository<Rent, Long> {
}
