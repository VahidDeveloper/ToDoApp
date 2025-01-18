package com.example.demo.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private String email;
    private String mobile;
    private boolean isActive;

    public User() {}

    public User(String name, String username,String email,String mobile,  boolean isActive) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.mobile = mobile;
        this.isActive = isActive;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public boolean getActive() { return isActive; }
    public void setActive(boolean completed) { this.isActive = completed; }
}