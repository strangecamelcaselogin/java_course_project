package ru.rsatu.boxes.rest.exception;

/**
 * Кидаем в случае, если не нашли сущности к которой обратился клиент
 */
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
