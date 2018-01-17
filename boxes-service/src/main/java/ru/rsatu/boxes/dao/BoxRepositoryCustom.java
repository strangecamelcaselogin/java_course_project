package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.domain.Box;
import ru.rsatu.boxes.domain.CarBrand;

public interface BoxRepositoryCustom  {
    Box findFreeBox(CarBrand brand);
}
