package ru.rsatu.boxes.domain;

import javax.persistence.*;

@Entity
public class Car extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "car_brand_id")
    private CarBrand carBrand;

    @Column(nullable = false, unique = true)
    private String number;

    public Car(Client client, CarBrand carBrand, String number) {
        this.client = client;
        this.carBrand = carBrand;
        this.number = number;
    }

    protected Car() {}

    public Long getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public CarBrand getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(CarBrand carBrand) {
        this.carBrand = carBrand;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
