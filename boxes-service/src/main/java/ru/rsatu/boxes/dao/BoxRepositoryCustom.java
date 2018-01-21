package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;

import java.util.List;

public interface BoxRepositoryCustom  {
    Box findFreeBox(CarBrand brand);

    List<Box> findFreeBoxes();

    Box findById(Long id);
}
