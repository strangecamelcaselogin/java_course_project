package ru.rsatu.boxes.dto;

public class BoxDTO extends AbstractDTO{
    private Long id;
    private Long carBrandId;
    private Long price;

    public BoxDTO() {}

    public BoxDTO(Long id, Long carBrandId, Long price) {
        this.id = id;
        this.carBrandId = carBrandId;
        this.price = price;
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

    public Long getCarBrandId() {
        return carBrandId;
    }

    public void setCarBrandId(Long carBrandId) {
        this.carBrandId = carBrandId;
    }
}
