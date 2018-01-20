package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.helpers.UserRole;
import ru.rsatu.boxes.persistence.*;
import ru.rsatu.boxes.dto.RentDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.Conflict;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/rents")
public class RentController {
    private final RentRepository rentRepository;
    private final CarRepository carRepository;
    private final BoxRepository boxRepository;
    private final ClientRepository clientRepository;

    private DomainToDTOMapper<RentDTO> rentDTOMapper = new DomainToDTOMapper<>(RentDTO.class);

    public RentController (RentRepository rentRepository,
                           CarRepository carRepository,
                           BoxRepository boxRepository,
                           ClientRepository clientRepository){
        this.boxRepository = boxRepository;
        this.carRepository = carRepository;
        this.rentRepository = rentRepository;
        this.clientRepository = clientRepository;
    }

    /**
     * Информация о договорах аренды
     *  Для обычного пользователя вернет список его договоров
     *  Для админа вернет все
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<RentDTO> getRents(Principal auth) {
        Client user = clientRepository.findByEmail(auth.getName());

        Iterable<Rent> result;

        if (new UserRole(user.getEmail()).isAdmin()) {
            result = rentRepository.findAll();
        }
        else {
            result = rentRepository.findByClient(user);
        }

        return rentDTOMapper.mapMany(result);
    }

//    /**
//     * Получить информацию о конкретном договоре
//     */
//    @RequestMapping(value = "/{rentId}", method = RequestMethod.GET)
//    public RentDTO getRent(@PathVariable Long rentId) {
//        Rent rent = rentRepository.findOne(rentId);
//
//        if (rent == null) {
//            throw new ResourceNotFound(rentId, "Rent not found");
//        }
//
//        return rentDTOMapper.mapOne(rent);
//    }

    /**
     * Арендовать бокс новый бокс
     * TODO проверить не стоит ли машина в другом боксе (? constrain на таблицу rent)
     * @param carId - id автомобиля клиента
     * @param end - время окончания аренды
     */
    @RequestMapping(method = RequestMethod.POST)
    public RentDTO postRent(Principal auth, @RequestParam Long carId, @RequestParam Long end) {
        // проверить, что машина принадлежит владельцу
        Client owner = clientRepository.findByEmail(auth.getName());
        Car car = carRepository.findOne(carId);

        if (car == null) {
            throw new ResourceNotFound(carId, "Car Not Found");
        }

        if (!car.getClient().getId().equals(owner.getId())) {
            throw new AccessViolation("You can not rent this Car");
        }

        CarBrand carBrand = car.getCarBrand();
        Box box;
        try {
            box = boxRepository.findFreeBox(carBrand);
            if (box == null) {
                throw new ResourceNotFound(null, "Box Not Found");  //TODO (?) другое исключение
            }

        } catch (IndexOutOfBoundsException e) {
            throw new Conflict("Box Not Found");
        }

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Long start = timestamp.getTime();

        // TODO валидировать даты
        // TODO даты как даты в БД
        Rent rent = new Rent(
                box,
                car,
                start,
                end,
                true
        );

        rentRepository.save(rent);

        return rentDTOMapper.mapOne(rent);
    }

    /**
     * Отмена аренды
     * @param rentId id аренды
     */
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
            throw new BadRequest("Can not change Rent");
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
