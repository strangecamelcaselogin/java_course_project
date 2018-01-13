package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.domain.Box;
import ru.rsatu.boxes.domain.CarBrand;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/boxes")
public class BoxController {
    private final BoxRepository boxRepository;
    private final CarBrandRepository carBrandRepository;


    public BoxController(BoxRepository boxRepository, CarBrandRepository carBrandRepository) {
        this.boxRepository = boxRepository;
        this.carBrandRepository = carBrandRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Box> getBoxes() {
        return boxRepository.findAll();
    }

    /**
     TODO только админ должен иметь доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public Box postBox(@RequestParam Long carBrandId, @RequestParam Long price) {
        CarBrand b = carBrandRepository.findOne(carBrandId);
        if (b == null) {
            throw new ResourceNotFoundException(carBrandId, "Car Brand Not Found");
        }

        Box box = new Box(b, price, false);

        boxRepository.save(box);

        return box;
    }

    /**
     TODO только админ должен иметь доступ
     */
    // TODO DELETE

}
