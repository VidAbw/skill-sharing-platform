package com.skillshare.learning_updates.service;

import com.skillshare.learning_updates.model.User;
import com.skillshare.learning_updates.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
    }
    public Optional<com.skillshare.learning_updates.model.User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public Optional<com.skillshare.learning_updates.model.User> findById(Long id) {
        return userRepo.findById(id);
    }

    public com.skillshare.learning_updates.model.User save(User user) {
        return userRepo.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }
}
