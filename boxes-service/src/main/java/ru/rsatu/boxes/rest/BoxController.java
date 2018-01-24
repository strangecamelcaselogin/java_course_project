package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.dto.BoxDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;

@RestController
@RequestMapping("/boxes")
public class BoxController {
    private final BoxRepository boxRepository;
    private final CarBrandRepository carBrandRepository;
    private final RentRepository rentRepository;

    private DomainToDTOMapper<BoxDTO> boxDTOMapper = new DomainToDTOMapper<>(BoxDTO.class);


    public BoxController(BoxRepository boxRepository,
                         CarBrandRepository carBrandRepository,
                         RentRepository rentRepository) {
        this.boxRepository = boxRepository;
        this.carBrandRepository = carBrandRepository;
        this.rentRepository = rentRepository;
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

    /**
     * Получить список свободных боксов
     * Только админ имеет доступ
     */
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

        Box box = boxRepository.findById(boxId);

        return boxDTOMapper.mapOne(box);
    }

    /**
     * Добавить бокс
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public BoxDTO postBox(Principal auth, @RequestParam Long carBrandId, @RequestParam Long price) {

        new AccessChecker(auth).onlyAdmin();

        CarBrand carBrand = carBrandRepository.findById(carBrandId);

        Box box = new Box(carBrand, price);

        boxRepository.save(box);

        return boxDTOMapper.mapOne(box);
    }

    /**
     * Обновить цену бокса
     * Может только админ и если бокс свободен
     */
    @RequestMapping(value = "/{boxId}", method = RequestMethod.PATCH)
    public BoxDTO patchBox(Principal auth, @PathVariable Long boxId, @RequestParam Long price) {

        new AccessChecker(auth).onlyAdmin();

        Box box = boxRepository.findById(boxId);

        try {
            rentRepository.findActiveByBox(box);
            throw new BadRequest("Can not change price to Box with active Rent");
        }
        catch (IncorrectResultSizeDataAccessException e) {
            box.setPrice(price);
            boxRepository.save(box);
        }

        return boxDTOMapper.mapOne(box);
    }

    /**
     * Удалить бокс (только если свободен)
     * Только админ имеет доступ
     */
    @RequestMapping(value="/{boxId}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteBox(Principal auth, @PathVariable Long boxId) {

        new AccessChecker(auth).onlyAdmin();

        try {
            boxRepository.delete(boxId);
        }
        catch(EmptyResultDataAccessException e){
            throw new BadRequest("Can not delete Box");
        }
        // Нельзя удалить бокс, который когда то был или сейчас занят машиной
        catch (DataIntegrityViolationException e) {
            throw new BadRequest("Can not delete Box while registered at least on Rent with this Box");
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
