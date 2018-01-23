package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.dto.CarBrandDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.BadRequest;

import java.security.Principal;

@RestController
@RequestMapping("/car_brands")
public class CarBrandController {
    private final CarBrandRepository carBrandRepository;
    private DomainToDTOMapper<CarBrandDTO> carBrandDTOMapper = new DomainToDTOMapper<>(CarBrandDTO.class);

    public CarBrandController(CarBrandRepository carBrandRepository) {
        this.carBrandRepository = carBrandRepository;
    }

    /**
     * Получить список Марок
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarBrandDTO> getCarBrands() {
        return carBrandDTOMapper.mapMany(carBrandRepository.findAll());
    }

    /**
     * Добавить марку
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CarBrandDTO> postCarBrand(Principal auth, @RequestParam String name) {

        new AccessChecker(auth).onlyAdmin();

        CarBrand carBrand = new CarBrand(name);

        try {
            carBrandRepository.save(carBrand);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequest("Can not create new Brand");
        }

        return new ResponseEntity<>(carBrandDTOMapper.mapOne(carBrand), HttpStatus.OK);
    }

    /**
     * Удалить марку
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public Boolean deleteCarBrand(Principal auth, @RequestParam Long id) {

        new AccessChecker(auth).onlyAdmin();

        try {
            carBrandRepository.delete(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFound(id, "Can not delete Brand");
        }
        // нельзя удалить марку, пока есть машины и боксы этой марки
        catch (DataIntegrityViolationException e) {
            throw new BadRequest("Can not delete Car Brand while registered at least on car or box with this Brand");
        }

        return true;
    }
}
