package ru.rsatu.boxes.rest.exception;

public class Conflict extends BaseApiException {
    public Conflict(String message) {
        super(message);
    }
}
