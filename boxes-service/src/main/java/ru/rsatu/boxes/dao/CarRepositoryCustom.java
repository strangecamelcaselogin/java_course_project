package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Car;

public interface CarRepositoryCustom {
    Car findById(Long id);
}
