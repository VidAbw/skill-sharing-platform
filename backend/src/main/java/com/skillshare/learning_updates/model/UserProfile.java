package com.skillshare.learning_updates.model;

import jakarta.persistence.*;

@Entity
public class UserProfile {

    @Id
    private Long userId; // This assumes user is already registered

    private String fullName;
    private String bio;
   
    private String profileImageUrl;

    public UserProfile() {}

    public UserProfile(Long userId, String fullName, String bio, String location, String profileImageUrl) {
        this.userId = userId;
        this.fullName = fullName;
        this.bio = bio;
        
        this.profileImageUrl = profileImageUrl;
    }

    // --- Getters and Setters ---

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

 

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }
}



