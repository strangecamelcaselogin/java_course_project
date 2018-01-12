package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.domain.CarBrand;

@RestController
@RequestMapping("/car_brands")
public class CarBrandController {
    private final CarBrandRepository carBrandRepository;

    public CarBrandController(CarBrandRepository carBrandRepository) {
        this.carBrandRepository = carBrandRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarBrand> getCarBrands() {
        return carBrandRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarBrand postCarBrand(@RequestParam String name) {
        CarBrand carBrand = new CarBrand(name);

        carBrandRepository.save(carBrand);

        return carBrand;
    }

    // TODO DELETE
}
