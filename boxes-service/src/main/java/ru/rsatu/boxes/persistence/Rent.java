package ru.rsatu.boxes.persistence;

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

    private Long startDate;
    private Long endDate;

    @Column(nullable = false)
    private Boolean active;

    public Rent(Box box, Car car, Long start_date, Long end_date, Boolean active) {
        this.box = box;
        this.car = car;
        this.startDate = start_date;
        this.endDate = end_date;
        this.active = active;
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
