package ru.rsatu.boxes.dto;

public class CarDTO extends AbstractDTO {
    private Long id;

    private Long clientId;

    private Long carBrandId;

    private String number;

    public CarDTO(Long id, Long clientId, Long carBrandId, String number) {
        this.id = id;
        this.clientId = clientId;
        this.carBrandId = carBrandId;
        this.number = number;
    }

    public CarDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getCarBrandId() {
        return carBrandId;
    }

    public void setCarBrandId(Long carBrandId) {
        this.carBrandId = carBrandId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
