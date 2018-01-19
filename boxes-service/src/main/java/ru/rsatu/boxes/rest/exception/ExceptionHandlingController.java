package ru.rsatu.boxes.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Перехватываем исключения из контроллеров и посылаем в ответ ExceptionResponse
 */
@ControllerAdvice
public class ExceptionHandlingController {

    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<ExceptionResponse> resourceNotFound(ResourceNotFound ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setResourceId(ex.getResourceId());
        response.setError("Not Found");
        response.setStatus(404);
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Conflict.class)
    public ResponseEntity<ExceptionResponse> conflict(Conflict ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setError("Conflict");
        response.setStatus(409);
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AccessViolation.class)
    public ResponseEntity<ExceptionResponse> forbidden(AccessViolation ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setError("Forbidden");
        response.setStatus(403);
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<ExceptionResponse> badRequest(BadRequest ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setError("Bad Request");
        response.setStatus(400);
        response.setMessage(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
