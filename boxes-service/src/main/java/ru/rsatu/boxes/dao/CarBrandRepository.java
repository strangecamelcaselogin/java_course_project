package ru.rsatu.boxes.dao;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import ru.rsatu.boxes.persistence.CarBrand;

@Repository
public interface CarBrandRepository extends CrudRepository<CarBrand, Long>{
}
