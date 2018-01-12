package ru.rsatu.boxes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.EntityManagerFactory;
//import javax.persistence.PersistenceUnit;
import javax.servlet.http.HttpServletRequest;
import java.util.NoSuchElementException;

@RestController
public abstract class ApiController {
//    @PersistenceUnit
//    protected EntityManagerFactory entityManagerFactory;

    @ExceptionHandler(value = NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    final String handleNotFound(HttpServletRequest req, NoSuchElementException e) {
        return e.getMessage();
    }
}