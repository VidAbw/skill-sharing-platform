package com.skillshare.learning_updates.repository;
import com.skillshare.learning_updates.model.UserProfile;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    List<UserProfile> findByFullNameContainingIgnoreCase(String fullName); // 🔍 Enables search

    // No extra methods needed for now — basic CRUD is enough!
}