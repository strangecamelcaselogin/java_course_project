package ru.rsatu.boxes.domain;

import javax.persistence.*;

@Entity
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "car_brand_id")
    public CarBrand carBrand;

    @Column(nullable = false)
    public Long price;

    @Column(nullable = false)
    public Boolean closed = false;

    public Box(CarBrand carBrand, Long price, Boolean closed) {
        this.carBrand = carBrand;
        this.price = price;
        this.closed = closed;
    }

    protected Box() {}
}
