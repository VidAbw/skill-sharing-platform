package com.skillshare.learning_updates.DTO;

public class CommentDTO {
    private Long id;
    private String content;
    private String createdAt;
    private Long userId;
    private String userName;
    private Long postOwnerId; // ✅ New

    public CommentDTO(Long id, String content, String createdAt, Long userId, String userName, Long postOwnerId) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userName = userName;
        this.postOwnerId = postOwnerId;
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public String getContent() { return content; }
    public String getCreatedAt() { return createdAt; }
    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }
    public Long getPostOwnerId() { return postOwnerId; }
}