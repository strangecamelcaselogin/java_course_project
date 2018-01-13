package ru.rsatu.boxes.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.domain.Client;
import ru.rsatu.boxes.dto.ClientDTO;
import ru.rsatu.boxes.helpers.DomainToDTOMapper;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;


@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    private DomainToDTOMapper<ClientDTO> clientDTOMapper = new DomainToDTOMapper<>(ClientDTO.class);

    /**
     * TODO только админ может получить список всех пользователей
     */
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<ClientDTO> getClients() {
        return clientDTOMapper.mapMany(clientRepository.findAll());
    }

    /**
     * todo Не нужно, создание пользователя должно происходить через /register
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ClientDTO> postClient(@RequestParam String email, @RequestParam String name, @RequestParam String password) {
        try {
            Client client = new Client(email, password, name);

            clientRepository.save(client);

            return new ResponseEntity<>(clientDTOMapper.mapOne(client), HttpStatus.OK);

        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // TODO response body
        }
    }

    @RequestMapping(value = "/{clientId}", method = RequestMethod.GET)
    public ClientDTO getClient(@PathVariable Long clientId) throws ResourceNotFoundException {
        return clientDTOMapper.mapOne(clientRepository.findById(clientId));
    }

    // TODO DELETE
}
