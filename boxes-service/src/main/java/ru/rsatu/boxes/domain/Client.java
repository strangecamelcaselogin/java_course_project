package ru.rsatu.boxes.domain;

import javax.persistence.*;

/**
 * Модель клиента
 */
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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