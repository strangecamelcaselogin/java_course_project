package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.CarBrand;

public interface CarBrandRepositoryCustom {
    public CarBrand findById(Long id);
}
