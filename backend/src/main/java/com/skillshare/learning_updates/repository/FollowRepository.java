package com.skillshare.learning_updates.repository;

import com.skillshare.learning_updates.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    // Check if a follow already exists
    Optional<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

    // Get all followers of a user
    List<Follow> findByFollowingId(Long followingId);

    // Get all users a user is following
    List<Follow> findByFollowerId(Long followerId);

    // Delete follow connection
    void deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);
}
