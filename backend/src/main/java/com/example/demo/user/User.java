package com.example.demo.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import java.time.LocalDateTime;


@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String mobile;
    private boolean active;
    @Column(nullable = false, updatable = false)
    private LocalDateTime creationTime = LocalDateTime.now();
    public User() {}

    public User(String username, String password ,String email,String mobile,  boolean active,LocalDateTime creationTime) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.active = active;
        this.creationTime = creationTime;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public boolean getActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreationTime() {return creationTime;}
    public void setCreationTime(LocalDateTime creationTime) {
        this.creationTime = creationTime;
    }
}