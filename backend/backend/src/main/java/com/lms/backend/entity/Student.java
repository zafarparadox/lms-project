package com.lms.backend.entity;
import jakarta.persistence.Entity;
import com.lms.backend.entity.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enrollment_no", unique = true)
    private String enrollmentNo;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "mobile_no")
    private String mobileNo;

    @Column(name = "address")
    private String address;

    @Column(name = "course")
    private String course;
    
    @Column(name = "semester")
    private Integer semester;

    @Column(name = "status")
    private String status;
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;
    @Column(name = "otp")
    private String otp;
    @Column(name = "otp_expiry")
    private Long otpExpiry;
    public Long getId() {
        return id;
    }

    
}