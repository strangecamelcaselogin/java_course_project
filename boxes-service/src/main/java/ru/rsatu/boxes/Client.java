package ru.rsatu.boxes;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;

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
}