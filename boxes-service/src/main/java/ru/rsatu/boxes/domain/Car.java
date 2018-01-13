package ru.rsatu.boxes.domain;

import javax.persistence.*;

@Entity
public class Car extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    public Client client;

    @ManyToOne
    @JoinColumn(name = "car_brand_id")
    public CarBrand carBrand;

    @Column(nullable = false, unique = true)
    public String number;

    public Car(Client client, CarBrand carBrand, String number) {
        this.client = client;
        this.carBrand = carBrand;
        this.number = number;
    }

    protected Car() {}
}
