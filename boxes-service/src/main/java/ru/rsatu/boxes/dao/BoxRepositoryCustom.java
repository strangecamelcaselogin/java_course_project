package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;

import java.util.List;

public interface BoxRepositoryCustom  {
    Box findFreeBox(CarBrand brand);

    Box findByClient(Client client);

    List<Box> findFreeBoxes();

    Box findById(Long id);
}
