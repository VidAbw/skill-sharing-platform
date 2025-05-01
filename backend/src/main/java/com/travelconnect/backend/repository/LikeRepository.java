package com.travelconnect.backend.repository;

import com.travelconnect.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    // Check if a user already liked a post
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);

    // Get all likes for a post
    List<Like> findByPostId(Long postId);

    // Count how many likes on a post
    long countByPostId(Long postId);

    // Delete like by user & post (used for "unlike")
    void deleteByUserIdAndPostId(Long userId, Long postId);
}
