package ru.rsatu.boxes.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.rest.security.AccessChecker;
import ru.rsatu.boxes.rest.security.UserRole;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.dto.ClientDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.AccessViolation;
import ru.rsatu.boxes.rest.exception.BadRequest;
import ru.rsatu.boxes.rest.exception.ResourceNotFound;

import java.security.Principal;


/*
Примеры как получить email текущего пользователя
 String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

Или в контроллере указать параметр 'Principal auth'
а потом
 String username = auth.getName();
 */


@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CarBrandRepository carBrandRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private DomainToDTOMapper<ClientDTO> clientDTOMapper = new DomainToDTOMapper<>(ClientDTO.class);

    /**
     * Только админ может получить список всех пользователей.
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<ClientDTO> getClients(Principal auth) {

        new AccessChecker(auth).onlyAdmin();

        return clientDTOMapper.mapMany(clientRepository.findAll());
    }

    /**
     * Получит всех клиентов с конкретной маркой автомобиля
     */
    @RequestMapping(value="/with_brand/{brandId}", method = RequestMethod.GET)
    public Iterable<ClientDTO> getClientsWithBrand(Principal auth, @PathVariable Long brandId) {
        if (new UserRole(auth).isAdmin()) {
            CarBrand carBrand = carBrandRepository.findOne(brandId);
            if (carBrand == null) {
                throw new ResourceNotFound(brandId, "CarBrand Not Found");
            }

            return clientDTOMapper.mapMany(clientRepository.getClientsWithBrand(carBrand));
        }
        else {
            throw new AccessViolation();
        }
    }

    /**
     * Получить данные о конкретном пользователе
     * Может только админ
     */
    @RequestMapping(value = "/{clientId}", method = RequestMethod.GET)
    public ClientDTO getClient(Principal auth, @PathVariable Long clientId) throws ResourceNotFound {
        if (new UserRole(auth).isAdmin()) {
            return clientDTOMapper.mapOne(clientRepository.findById(clientId));
        }
        else {
            throw new AccessViolation();
        }
    }

    /**
     * Получить данные о себе
     */
    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public ClientDTO getMe(Principal auth) {
        String myUsername = auth.getName();
        return clientDTOMapper.mapOne(clientRepository.findByEmail(myUsername));
    }

    /**
     * Создание новго пользователя (регистрация)
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ClientDTO> postClient(@RequestParam String email, @RequestParam String name,
                                                @RequestParam String address, @RequestParam String password) {
        try {
            Client client = new Client(
                    email,
                    bCryptPasswordEncoder.encode(password), // захешируем пароль пользователя
                    name, address);

            clientRepository.save(client);

            return new ResponseEntity<>(clientDTOMapper.mapOne(client), HttpStatus.OK);

        } catch (DataIntegrityViolationException e) {
            throw new BadRequest("Can not register new user");
        }
    }
}
