package ru.rsatu.boxes.rest.exception;

public class AccessViolation extends BaseApiException {
    public AccessViolation(String message) {
        super(message);
    }

    public AccessViolation() {
        super("You are not allowed to view this resource");
    }
}
