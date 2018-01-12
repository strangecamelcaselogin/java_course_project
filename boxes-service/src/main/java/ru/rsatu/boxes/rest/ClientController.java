package ru.rsatu.boxes.rest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.rsatu.boxes.domain.Client;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.rest.exception.ResourceNotFoundException;


@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Client> getClients() {
        return clientRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Client> postClient(@RequestParam String email, @RequestParam String password) {
        try {
            Client client = new Client(email, password);

            clientRepository.save(client);

            return new ResponseEntity<>(client, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // TODO response body
        }
    }

    @RequestMapping(value = "/{clientId}", method = RequestMethod.GET)
    public Client getClient(@PathVariable Long clientId) {
        Client client = clientRepository.findOne(clientId);

        // TODO все это в RepositoryImpl https://stackoverflow.com/questions/11880924/how-to-add-custom-method-to-spring-data-jpa
        if (client == null) {
            throw new ResourceNotFoundException(clientId, "Client Not Found");
        }

        return client;
    }

    // TODO DELETE
}
