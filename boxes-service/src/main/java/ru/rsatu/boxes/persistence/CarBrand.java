package ru.rsatu.boxes.persistence;

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

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
