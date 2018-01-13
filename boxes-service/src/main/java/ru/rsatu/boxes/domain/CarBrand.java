package ru.rsatu.boxes.domain;

import javax.persistence.*;


@Entity
public class CarBrand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true, nullable = false)
    public String name;

    public CarBrand(String name) {
        this.name = name;
    }

    protected CarBrand(){}
}
