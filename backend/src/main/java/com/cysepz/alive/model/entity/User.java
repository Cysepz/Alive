package com.cysepz.alive.model.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter // [1] 自動產生所有欄位的 Getter
@Setter // [2] 自動產生所有欄位的 Setter
@NoArgsConstructor // [3] JPA 規範：必須有無參數構造函數
@AllArgsConstructor // [4] 方便測試與開發使用
@Builder // [5] 專業標配：使用建造者模式建立物件
@Table(name = "`USER`", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "provider", "provider_id" })
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private AuthProvider provider;

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "token", nullable = true)
    private String token;

    @Column(name = "account", length = 20, unique = true, nullable = false)
    @Size(min = 1, max = 20)
    private String account;

    @Column(name = "username", length = 10, nullable = false)
    @Size(min = 1, max = 10)
    private String username;

    @Column(name = "birthday", nullable = false)
    @Past(message = "Invalid Birthday")
    private LocalDate birthday;

    @Column(name = "address", nullable = false)
    @Pattern(regexp = "^[\\u4e00-\\u9fa5]{2,5}(市|縣)[\\u4e00-\\u9fa5]{2,5}(區|鎮|鎮|鄉|市)[\\u4e00-\\u9fa5\\d\\u00b7].*$", message = "請輸入有效的台灣地址格式")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "situation", nullable = false)
    private LivingSituation situation;

    @Column(name = "phone", unique = true, nullable = false)
    @Pattern(regexp = "09\\d{2}-\\d{3}-\\d{3}", message = "Invalid Phone number Format")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @UpdateTimestamp
    @Column(name = "last_check_in_time")
    private LocalDateTime lastCheckInTime;

    @Column(name = "monthly_bitmap")
    private int monthlyBitmap;

    public enum AuthProvider {
        GOOGLE, FACEBOOK, LINE
    }

    public enum LivingSituation {
        LIVING_ALONE,
        WITH_PARENTS,
        WITH_SPOUSE,
        WITH_CHILDREN,
        WITH_RELATIVES
    }

    public enum Role {
        MEMBER, MANAGER, ADMIN
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contact> contacts = new ArrayList<>();

    // 建立 Helper Method 同步雙向關係
    public void addContact(Contact contact) {
        contacts.add(contact);
        contact.setUser(this);
    }

    public void removeContact(Contact contact) {
        contacts.remove(contact);
        contact.setUser(null);
    }

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserSetting userSetting;

}