package com.skillshare.learning_updates.DTO;

import java.time.LocalDateTime;

public class LearningProgressDTO {

        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Long userId; // Instead of full User object

        // Constructors
        public LearningProgressDTO() {}

        public LearningProgressDTO(Long id, String title, String content,
                                   LocalDateTime createdAt, LocalDateTime updatedAt,
                                   Long userId) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.userId = userId;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

    }
