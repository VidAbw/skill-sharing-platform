package com.skillshare.learning_updates.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningProgress> learningProgressList = new ArrayList<>();
    
    // Default constructor required by JPA
    public User() {
    }
    
    // Constructor with fields
    public User(Long id, String username, String email, String password, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public List<LearningProgress> getLearningProgressList() {
        return learningProgressList;
    }
    
    public void setLearningProgressList(List<LearningProgress> learningProgressList) {
        this.learningProgressList = learningProgressList;
    }
    
    // Helper methods for bidirectional relationship
    public void addLearningProgress(LearningProgress learningProgress) {
        learningProgressList.add(learningProgress);
        learningProgress.setUser(this);
    }
    
    public void removeLearningProgress(LearningProgress learningProgress) {
        learningProgressList.remove(learningProgress);
        learningProgress.setUser(null);
    }
}
