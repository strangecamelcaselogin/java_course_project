package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.helpers.UserRole;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.dto.CarBrandDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.BadRequest;

import java.security.Principal;

@RestController
@RequestMapping("/car_brands")
public class CarBrandController {
    private final CarBrandRepository carBrandRepository;
    private DomainToDTOMapper<CarBrandDTO> carBrandDTOmapper = new DomainToDTOMapper<>(CarBrandDTO.class);

    public CarBrandController(CarBrandRepository carBrandRepository) {
        this.carBrandRepository = carBrandRepository;
    }

    /**
     * Получить список Марок
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarBrandDTO> getCarBrands() {
        return carBrandDTOmapper.mapMany(carBrandRepository.findAll());
    }

    /**
     * Только админ имеет доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CarBrandDTO> postCarBrand(Principal auth, @RequestParam String name) {
        if (!(new UserRole(auth.getName())).isAdmin()) {
            throw new AccessViolation();
        }

        CarBrand carBrand = new CarBrand(name);

        try {
            carBrandRepository.save(carBrand);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequest("Can not create new Brand");
        }

        return new ResponseEntity<>(carBrandDTOmapper.mapOne(carBrand), HttpStatus.OK);
    }

    /**
     * Только админ имеет доступ
     * TODO нельзя удалить марку, пока есть машины и боксы этой марки
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteCarBrand(Principal auth, @RequestParam Long id) {
        if (!(new UserRole(auth.getName())).isAdmin()) {
            throw new AccessViolation();
        }

        try {
            carBrandRepository.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new BadRequest("Can not delete Brand");
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
