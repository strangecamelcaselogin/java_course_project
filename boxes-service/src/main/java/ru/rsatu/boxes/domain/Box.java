package ru.rsatu.boxes.domain;

import javax.persistence.*;

@Entity
public class Box extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_brand_id")
    private CarBrand carBrand;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private Boolean closed = false;

    public Box(CarBrand carBrand, Long price, Boolean closed) {
        this.carBrand = carBrand;
        this.price = price;
        this.closed = closed;
    }

    protected Box() {}

    public Long getId() {
        return id;
    }

    public CarBrand getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(CarBrand carBrand) {
        this.carBrand = carBrand;
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
}
