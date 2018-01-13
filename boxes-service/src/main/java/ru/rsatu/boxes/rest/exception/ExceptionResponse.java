package ru.rsatu.boxes.rest.exception;


/**
 * Класс, который мы сериализуем и отправим в ответ запрос, который кинул исключение
 */
public class ExceptionResponse {
    private String error;
    private Integer status;
    private String message;
    private Long resourceId;

    public ExceptionResponse() {
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
