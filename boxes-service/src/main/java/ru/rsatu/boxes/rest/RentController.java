package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.persistence.*;
import ru.rsatu.boxes.dto.RentDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.Conflict;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;
import java.sql.Timestamp;

@RestController
@RequestMapping("/rents")
public class RentController {
    private final RentRepository rentRepository;
    private final CarRepository carRepository;
    private final BoxRepository boxRepository;
    private final ClientRepository clientRepository;

    private DomainToDTOMapper<RentDTO> rentDTOMapper = new DomainToDTOMapper<>(RentDTO.class);

    public RentController (RentRepository rentRepository, CarRepository carRepository, BoxRepository boxRepository,
                           ClientRepository clientRepository){
        this.boxRepository = boxRepository;
        this.carRepository = carRepository;
        this.rentRepository = rentRepository;
        this.clientRepository = clientRepository;
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
    public RentDTO postRent(@RequestParam Long carId, @RequestParam Long end) {

        Car car = carRepository.findOne(carId);
        CarBrand carBrand = car.getCarBrand();
        Long boxId = new Long(0);
        try {
            Box box = boxRepository.findFreeBox(carBrand);
            boxId = box.getId();
            if (box == null) {
                //TODO (?) другое исключение
                throw new ResourceNotFound(boxId, "Box Not Found");
            }
        } catch (IndexOutOfBoundsException e) {
            throw new Conflict("Box Not Found");
        }


        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Long start = timestamp.getTime();

        if (car == null) {
            throw new ResourceNotFound(carId, "Car Not Found");
        }

        // TODO валидировать даты
        Rent rent = new Rent(
                boxRepository.findOne(boxId),
                carRepository.findOne(carId),
                start,
                end,
                true
        );

        rentRepository.save(rent);

        return rentDTOMapper.mapOne(rent);
    }

    @RequestMapping(value="/{rentId}", method = RequestMethod.PATCH)
    public ResponseEntity<Boolean> cancelRent(Principal auth, @PathVariable Long rentId) {
        try {
            Client owner = clientRepository.findByEmail(auth.getName());
            Rent rent = rentRepository.findOne(rentId);
            Car car = rent.getCar();

            if (!car.getClient().getId().equals(owner.getId())) {
                throw new AccessViolation("Client can not patch this Rent");
            }

            rent.setActive(false);
            rentRepository.save(rent);

        } catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
