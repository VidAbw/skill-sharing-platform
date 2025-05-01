package com.travelconnect.backend.repository;

import com.travelconnect.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Custom method to get all comments for a specific post
    List<Comment> findByPostId(Long postId);

    // Custom method to get all comments made by a specific user
    List<Comment> findByUserId(Long userId);
}
