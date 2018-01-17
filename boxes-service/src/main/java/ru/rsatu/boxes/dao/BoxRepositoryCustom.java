package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;

public interface BoxRepositoryCustom  {
    Box findFreeBox(CarBrand brand);
}
