package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.rest.security.UserRole;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.dto.BoxDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;

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

    /**
     * Получить информацию о боксах
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<BoxDTO> getBoxes(Principal auth) {

        new AccessChecker(auth).onlyAdmin();

        return boxDTOMapper.mapMany(boxRepository.findAll());
    }

    @RequestMapping(value="/free", method = RequestMethod.GET)
    public Iterable<BoxDTO> getFreeBoxes(Principal auth) {

        new AccessChecker(auth).onlyAdmin();

        return boxDTOMapper.mapMany(boxRepository.findFreeBoxes());
    }

    /**
     * Получить информацию о боксе
     * Только админ имеет доступ
     */
    @RequestMapping(value="/{boxId}", method = RequestMethod.GET)
    public BoxDTO getBox(Principal auth, @PathVariable Long boxId) throws ResourceNotFound {

        new AccessChecker(auth).onlyAdmin();

        Box box = boxRepository.findOne(boxId);

        if (box == null) {
            throw new ResourceNotFound(boxId, "Box Not Found");
        }

        return boxDTOMapper.mapOne(box);
    }

    /**
     * Добавить бокс
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public BoxDTO postBox(Principal auth, @RequestParam Long carBrandId, @RequestParam Long price) {

        new AccessChecker(auth).onlyAdmin();

        CarBrand b = carBrandRepository.findOne(carBrandId);
        if (b == null) {
            throw new ResourceNotFound(carBrandId, "Car Brand Not Found");
        }

        Box box = new Box(b, price);

        boxRepository.save(box);

        return boxDTOMapper.mapOne(box);
    }

    /**
     * Удалить бокс
     * Только админ имеет доступ
     * TODO нельзя удалять бокс, пока в нем машина
     */
    @RequestMapping(value="/{boxId}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteBox(Principal auth, @PathVariable Long boxId) {

        new AccessChecker(auth).onlyAdmin();

        try {
            boxRepository.delete(boxId);
        } catch(EmptyResultDataAccessException e){
            throw new BadRequest("Can not delete Box");
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
