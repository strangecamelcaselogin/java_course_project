package ru.rsatu.boxes.rest;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.dto.CarDTO;
import ru.rsatu.boxes.dto.RentDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;

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
}
