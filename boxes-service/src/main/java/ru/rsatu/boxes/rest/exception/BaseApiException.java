package ru.rsatu.boxes.rest.exception;

public class BaseApiException extends RuntimeException {
    // todo timestamp
    public BaseApiException(String message){
        super(message);
    }
}
