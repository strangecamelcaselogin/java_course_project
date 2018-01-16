package ru.rsatu.boxes.domain;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
public class Rent extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "box_id")
    private Box box;

    @OneToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private String startDate;
    private String endDate;

    @Column(nullable = false)
    private Boolean busy;

    public Rent(Box box, Car car, String start_date, String end_date) {
        this.box = box;
        this.car = car;
        this.startDate = start_date;
        this.endDate = end_date;
        this.busy = true;
    }

    public Rent() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
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
