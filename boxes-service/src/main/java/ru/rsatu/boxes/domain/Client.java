package ru.rsatu.boxes.domain;

import javax.persistence.*;

/**
 * JPA Модель клиента
 */
@Entity
public class Client extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    public Client(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    protected Client() {}

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }
}