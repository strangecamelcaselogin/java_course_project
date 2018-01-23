package ru.rsatu.boxes.dto;

import java.util.Date;

public class RentDTO extends AbstractDTO{
    private Long id;
    private Long boxId;
    private Long carId;
    private Date startDate;
    private Date endDate;
    private Boolean active;

    public RentDTO(Long box_id, Long car_id, Date startDate, Date endDate, Boolean active){
        this.boxId = box_id;
        this.carId = car_id;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
