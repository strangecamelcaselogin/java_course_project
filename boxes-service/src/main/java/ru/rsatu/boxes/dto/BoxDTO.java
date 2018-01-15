package ru.rsatu.boxes.dto;

public class BoxDTO extends AbstractDTO{
    private Long id;
    private Long carBrandId;
    private Long price;
    private Boolean closed;

    public BoxDTO() {}

    public BoxDTO(Long id, Long carBrandId, Long price, Boolean closed) {
        this.id = id;
        this.carBrandId = carBrandId;
        this.price = price;
        this.closed = closed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    public Long getCarBrandId() {
        return carBrandId;
    }

    public void setCarBrandId(Long carBrandId) {
        this.carBrandId = carBrandId;
    }
}
