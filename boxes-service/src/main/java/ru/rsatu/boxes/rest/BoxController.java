package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.domain.Box;
import ru.rsatu.boxes.domain.CarBrand;
import ru.rsatu.boxes.dto.BoxDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/boxes")
public class BoxController {
    private final BoxRepository boxRepository;
    private final CarBrandRepository carBrandRepository;

    private DomainToDTOMapper<BoxDTO> boxDTOMapper = new DomainToDTOMapper<>(BoxDTO.class);


    public BoxController(BoxRepository boxRepository, CarBrandRepository carBrandRepository) {
        this.boxRepository = boxRepository;
        this.carBrandRepository = carBrandRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<BoxDTO> getBoxes() {
        return boxDTOMapper.mapMany(boxRepository.findAll());
    }

    @RequestMapping(value="/{boxId}", method = RequestMethod.GET)
    public BoxDTO getBox(@PathVariable Long boxId) {
        //TODO проверить существование бокса
        return boxDTOMapper.mapOne(boxRepository.findOne(boxId));
    }

    /**
     TODO только админ должен иметь доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public BoxDTO postBox(@RequestParam Long carBrandId, @RequestParam Long price) {
        CarBrand b = carBrandRepository.findOne(carBrandId);
        if (b == null) {
            throw new ResourceNotFoundException(carBrandId, "Car Brand Not Found");
        }

        Box box = new Box(b, price, false);

        boxRepository.save(box);

        return boxDTOMapper.mapOne(box);
    }

    /**
     TODO только админ должен иметь доступ
     */
    @RequestMapping(value="/{boxId}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteBox(@PathVariable Long boxId) {
        try {
            boxRepository.delete(boxId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
