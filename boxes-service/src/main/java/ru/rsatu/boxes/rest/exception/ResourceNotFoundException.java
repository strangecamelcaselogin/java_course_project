package ru.rsatu.boxes.rest.exception;

public class ResourceNotFoundException extends BaseApiException {

    private Long resourceId;

    public ResourceNotFoundException(Long resourceId, String message) {
        super(message);
        this.resourceId = resourceId;
    }

    public Long getResourceId() {
        return resourceId;
    }
}
