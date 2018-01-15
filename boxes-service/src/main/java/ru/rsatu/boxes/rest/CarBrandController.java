package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.domain.CarBrand;
import ru.rsatu.boxes.dto.CarBrandDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;

@RestController
@RequestMapping("/car_brands")
public class CarBrandController {
    private final CarBrandRepository carBrandRepository;
    private DomainToDTOMapper<CarBrandDTO> mapper = new DomainToDTOMapper<>(CarBrandDTO.class);

    public CarBrandController(CarBrandRepository carBrandRepository) {
        this.carBrandRepository = carBrandRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<CarBrandDTO> getCarBrands() {
        return mapper.mapMany(carBrandRepository.findAll());
    }

    /**
     TODO только админ должен иметь доступ
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CarBrandDTO> postCarBrand(@RequestParam String name) {
        CarBrand carBrand = new CarBrand(name);

        try {
            carBrandRepository.save(carBrand);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // TODO response body
        }

        return new ResponseEntity<>(mapper.mapOne(carBrand), HttpStatus.OK);
    }

    /**
     TODO только админ должен иметь доступ
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteCarBrand(@RequestParam Long id) {
        try {
            carBrandRepository.delete(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
