package ru.rsatu.boxes.domain;

import javax.persistence.*;


@Entity
public class CarBrand extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    public CarBrand(String name) {
        this.name = name;
    }

    protected CarBrand(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }
}
