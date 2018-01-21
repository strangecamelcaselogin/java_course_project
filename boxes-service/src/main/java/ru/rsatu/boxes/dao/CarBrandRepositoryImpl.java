package ru.rsatu.boxes.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

@Component
public class CarBrandRepositoryImpl implements CarBrandRepositoryCustom {
    @Autowired
    private CarBrandRepository carBrandRepository;

    @Override
    public CarBrand findById(Long id) {
        CarBrand r = carBrandRepository.findOne(id);

        if (r == null) {
            throw new ResourceNotFound(id, "Car brand Not Found");
        }

        return r;
    }
}
