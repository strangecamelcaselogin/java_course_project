package ru.rsatu.boxes.rest.exception;

public class BadRequest extends BaseApiException {
    public BadRequest(String message) {
        super(message);
    }
}
