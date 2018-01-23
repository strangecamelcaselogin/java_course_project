package ru.rsatu.boxes.rest;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.dao.RentRepository;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.rest.security.UserRole;
import ru.rsatu.boxes.persistence.*;
import ru.rsatu.boxes.dto.RentDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;
import java.sql.Date;
import java.time.Instant;

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

    /**
     * Получить информацию о конкретном договоре
     * Только админ
     */
    @RequestMapping(value = "/{rentId}", method = RequestMethod.GET)
    public RentDTO getRent(Principal auth, @PathVariable Long rentId) {

        new AccessChecker(auth).onlyAdmin();

        Rent rent = rentRepository.findOne(rentId);

        if (rent == null) {
            throw new ResourceNotFound(rentId, "Rent not found");
        }

        return rentDTOMapper.mapOne(rent);
    }

    /**
     * Арендовать бокс новый бокс
     * @param carId - id автомобиля клиента
     * @param end - время окончания аренды
     */
    @RequestMapping(method = RequestMethod.POST)
    public RentDTO postRent(Principal auth, @RequestParam Long carId, @RequestParam Long end) {
        Long MINIMAL_RENT_DURATION_SEC = 3600L;

        Client owner = clientRepository.findByEmail(auth.getName());
        Car car = carRepository.findById(carId);

        // проверим, что машина принадлежит владельцу
        if (!car.getClient().getId().equals(owner.getId())) {
            throw new AccessViolation("You can not rent this Car");
        }

        try {
            // если нашлась рента по машине, значит нельзя
            rentRepository.findActiveByCar(car);
            throw new BadRequest("Car already have active rent");
        } catch (IncorrectResultSizeDataAccessException ignored) {}

        CarBrand carBrand = car.getCarBrand();
        Box box = boxRepository.findFreeBox(carBrand);  // возьмем первый свободный бокс

        Instant startTs = Instant.now();
        Instant endTs = Instant.ofEpochSecond(end);

        if ((endTs.getEpochSecond() - startTs.getEpochSecond()) < MINIMAL_RENT_DURATION_SEC){
            throw new BadRequest(String.format("Rent duration can not be less than %s hours", MINIMAL_RENT_DURATION_SEC / 3600));
        }

        Rent rent = new Rent(
                box,
                car,
                Date.from(startTs),
                Date.from(endTs),
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
            Rent rent = rentRepository.findById(rentId);
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
