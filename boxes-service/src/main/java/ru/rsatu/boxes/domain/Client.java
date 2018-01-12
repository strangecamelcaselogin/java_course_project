package ru.rsatu.boxes.domain;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

/**
 * Модель клиента
 */
@Entity
public class Client {
    @Id
    @GeneratedValue
    public Long id;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(nullable = false)
    public String password;

    public Client(String email, String password) {
        this.email = email;
        this.password = password;
    }

    protected Client() {}
}