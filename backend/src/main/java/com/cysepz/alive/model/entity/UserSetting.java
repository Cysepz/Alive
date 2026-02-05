package com.cysepz.alive.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_setting")
public class UserSetting {
    @Id
    private long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "alarm_contact")
    private int alarmContact;

    @Column(name = "alarm_pro")
    private int alarmPro;

    @Column(name = "public_record")
    private boolean publicRecord;

}
