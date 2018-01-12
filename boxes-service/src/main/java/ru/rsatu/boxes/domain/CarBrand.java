package ru.rsatu.boxes.domain;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;


@Entity
public class CarBrand {
    @Id
    @GeneratedValue
    public Long id;

    @Column(unique = true, nullable = false)
    public String name;

    public CarBrand(String name) {
        this.name = name;
    }

    protected CarBrand(){}
}
