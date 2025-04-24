package com.skillshare.learning_updates.repository;

import com.skillshare.learning_updates.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find a user by username
     * @param username the username to search for
     * @return the user if found
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Find a user by email
     * @param email the email to search for
     * @return the user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if a user with the given username exists
     * @param username the username to check
     * @return true if a user exists with this username
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if a user with the given email exists
     * @param email the email to check
     * @return true if a user exists with this email
     */
    boolean existsByEmail(String email);
}
