package ru.rsatu.boxes;

//import org.hibernate.Session;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.EntityManager;
//import javax.persistence.EntityTransaction;

@RestController
@RequestMapping("/clients")
public class ClientController extends ApiController {

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
//        EntityManager em = entityManagerFactory.createEntityManager();
//        EntityTransaction tx = null;
//        Session session = null;
//
//        try {
//            session = em.unwrap(Session.class);
//            tx = em.getTransaction();
//            tx.begin();
//        } catch (Throwable e) {
//
//        }

        try {
            Client client = new Client();
            client.email = email;
            client.password = password;

            clientRepository.save(client);

            return new ResponseEntity<>(client, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // System.out.println(e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{clientId}", method = RequestMethod.GET)
    public Iterable<Client> getClient(@PathVariable Long clientId) {
        return clientRepository.findById(clientId);
    }

}
