package ru.rsatu.boxes.dto;

public class RentDTO extends AbstractDTO{
    private Long id;
    private Long boxId;
    private Long carId;
    private Long startDate;
    private Long endDate;
    private Boolean active;

    public RentDTO(Long box_id, Long car_id, Long start_date, Long end_date, Boolean active){
        this.boxId = box_id;
        this.carId = car_id;
        this.startDate = start_date;
        this.endDate = end_date;
        this.active = active;
    }

    public RentDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBoxId() {
        return boxId;
    }

    public void setBoxId(Long boxId) {
        this.boxId = boxId;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getStartDate() {
        return startDate;
    }

    public void setStartDate(Long startDate) {
        this.startDate = startDate;
    }

    public Long getEndDate() {
        return endDate;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }
}
