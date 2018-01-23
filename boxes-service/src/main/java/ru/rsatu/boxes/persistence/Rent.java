package ru.rsatu.boxes.persistence;

import javax.persistence.*;
import java.util.Date;

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

    private Date startDate;
    private Date endDate;

    @Column(nullable = false)
    private Boolean active;

    public Rent(Box box, Car car, Date startDate, Date endDate, Boolean active) {
        this.box = box;
        this.car = car;
        this.startDate = startDate;
        this.endDate = endDate;
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
