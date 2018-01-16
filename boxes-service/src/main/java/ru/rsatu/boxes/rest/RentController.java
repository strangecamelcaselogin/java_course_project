package ru.rsatu.boxes.rest;

import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.domain.*;
import ru.rsatu.boxes.dto.RentDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/rents")
public class RentController {
    private final RentRepository rentRepository;
    private final CarRepository carRepository;
    private final BoxRepository boxRepository;

    private DomainToDTOMapper<RentDTO> rentDTOMapper = new DomainToDTOMapper<>(RentDTO.class);

    public RentController (RentRepository rentRepository, CarRepository carRepository, BoxRepository boxRepository){
        this.boxRepository = boxRepository;
        this.carRepository = carRepository;
        this.rentRepository = rentRepository;
    }

    //TODO для каждого клиента свои
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<RentDTO> getRents() {
        return rentDTOMapper.mapMany(rentRepository.findAll());
    }

    @RequestMapping(value = "/{rentId}", method = RequestMethod.GET)
    public RentDTO getRent(@PathVariable Long rentId) {
        return rentDTOMapper.mapOne(rentRepository.findOne(rentId));  // TODO исключения
    }

    @RequestMapping(method = RequestMethod.POST)
    public RentDTO postRent(@RequestParam Long carId, @RequestParam Long boxId,
                            @RequestParam String start, @RequestParam String end) {

        Box box = boxRepository.findOne(boxId);
        Car car = carRepository.findOne(carId);

        if (box == null) {
            throw new ResourceNotFoundException(boxId, "Box Not Found");
        }
        if (car == null) {
            throw new ResourceNotFoundException(carId, "Car Not Found");
        }

        // TODO валидировать даты
        Rent rent = new Rent(
                boxRepository.findOne(boxId),
                carRepository.findOne(carId),
                start,
                end
        );

        rentRepository.save(rent);

        return rentDTOMapper.mapOne(rent);
    }
}
