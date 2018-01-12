package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.domain.Box;

@RestController
@RequestMapping("/boxes")
public class BoxController extends ApiController {
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

    @RequestMapping(method = RequestMethod.POST)
    public Box postBox(@RequestParam Long carBrandId, @RequestParam Long price) {
        Box box = new Box(carBrandRepository.findOne(carBrandId), price, false);

        boxRepository.save(box);

        return box;
    }

    // TODO DELETE

}
