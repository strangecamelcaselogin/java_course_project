package ru.rsatu.boxes.rest.exception;

public class AccessViolationException extends BaseApiException {
    public AccessViolationException(String message) {
        super(message);
    }
}
