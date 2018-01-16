package ru.rsatu.boxes.dto;

public class RentDTO extends AbstractDTO{
    private Long id;
    private Long boxId;
    private Long carId;
    private String startDate;
    private String endDate;
    private Boolean busy;

    public RentDTO(Long box_id, Long car_id, String start_date, String end_date){
        this.boxId = box_id;
        this.carId = car_id;
        this.startDate = start_date;
        this.endDate = end_date;
    }

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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Boolean getBusy() {
        return busy;
    }

    public void setBusy(Boolean busy) {
        this.busy = busy;
    }
}
