package com.cysepz.alive.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "pro_user")
public class Pro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pro_id", nullable = false)
    private Long proId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "real_name", length = 20, nullable = false)
    @Size(min = 2, max = 20)
    private String realName;

    @Column(name = "organization", nullable = false)
    private String organization;

    @Enumerated(EnumType.STRING)
    @Column(name = "pro_type", nullable = false)
    private proType proType;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    public enum proType {
        SOCIAL_WORKER,
        CHIEF_OF_VILLAGE,
    }
}
