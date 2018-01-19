package ru.rsatu.boxes.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.persistence.Client;
import ru.rsatu.boxes.dto.ClientDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;


/*
Примеры как получить email текущего пользователя
 String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

Или в контроллере указать параметр 'Principal auth'
а потом
 String username = auth.getPrincipal().toString();*/


@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private DomainToDTOMapper<ClientDTO> clientDTOMapper = new DomainToDTOMapper<>(ClientDTO.class);

    /**
     * TODO только админ может получить список всех пользователей
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<ClientDTO> getClients() {
        return clientDTOMapper.mapMany(clientRepository.findAll());
    }

    @RequestMapping(value = "/{clientId}", method = RequestMethod.GET)
    public ClientDTO getClient(@PathVariable Long clientId) throws ResourceNotFoundException {
        return clientDTOMapper.mapOne(clientRepository.findById(clientId));
    }

    /**
     * todo Не нужно, создание пользователя должно происходить через /register
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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // TODO response body
        }
    }
}
