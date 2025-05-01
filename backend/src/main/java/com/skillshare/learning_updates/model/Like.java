package com.skillshare.learning_updates.model;

import jakarta.persistence.*;

@Entity
@Table(name = "likes") // because "like" is a SQL keyword
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long postId;

    public Like() {}

    public Like(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
    }

    // --- Getters & Setters ---

    public Long getId() { return id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }
}
