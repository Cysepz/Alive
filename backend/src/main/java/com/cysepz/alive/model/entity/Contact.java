package com.cysepz.alive.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id", unique = true, nullable = false)
    private Long contactId;

    @Column(name = "name", length = 10, nullable = false)
    @Size(min = 1, max = 10)
    private String name;

    @Column(name = "phone", unique = true, nullable = true)
    @Pattern(regexp = "09\\d{2}-\\d{3}-\\d{3}", message = "Invalid Phone number Format")
    private String phone;

    @Column(name = "email", unique = true, nullable = true)
    @Email(message = "Invalid Email format")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "relation")
    private relation relation;

    public enum relation {
        PARENTS, SPOUSE, CHILDREN, RELATIVES
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

}
