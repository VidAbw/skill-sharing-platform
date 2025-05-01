package com.travelconnect.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDateTime createdAt;

    private Long userId;  // ID of the user who posted the comment
    private Long postId;  // ID of the post the comment belongs to

    public Comment() {
        this.createdAt = LocalDateTime.now();
    }

    public Comment(String content, Long userId, Long postId) {
        this.content = content;
        this.userId = userId;
        this.postId = postId;
        this.createdAt = LocalDateTime.now();
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }
}
