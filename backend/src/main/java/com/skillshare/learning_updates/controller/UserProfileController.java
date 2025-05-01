package com.skillshare.learning_updates.controller;

import com.skillshare.learning_updates.model.UserProfile;
import com.skillshare.learning_updates.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*")
public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    // ✅ GET user profile by userId
    @GetMapping("/{userId}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long userId) {
        Optional<UserProfile> profile = userProfileRepository.findById(userId);

        if (profile.isPresent()) {
            return ResponseEntity.ok(profile.get());
        }

        // If not found, create a default blank profile
        UserProfile newProfile = new UserProfile();
        newProfile.setUserId(userId);
        newProfile.setFullName("");
        newProfile.setBio("");
       
        newProfile.setProfileImageUrl("");

        UserProfile saved = userProfileRepository.save(newProfile);
        return ResponseEntity.ok(saved);
    }

    // ✅ UPDATE user profile with file upload support
    @PutMapping("/{userId}")
    public ResponseEntity<UserProfile> updateProfile(
            @PathVariable Long userId,
            @RequestParam("fullName") String fullName,
            @RequestParam("bio") String bio,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            Optional<UserProfile> optionalProfile = userProfileRepository.findById(userId);

            if (!optionalProfile.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            UserProfile profile = optionalProfile.get();
            profile.setFullName(fullName);
            profile.setBio(bio);

            if (profileImage != null && !profileImage.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
                Path uploadPath = Paths.get("uploads");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(profileImage.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                profile.setProfileImageUrl("/uploads/" + fileName);
            }

            UserProfile savedProfile = userProfileRepository.save(profile);
            return ResponseEntity.ok(savedProfile);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // ✅ SEARCH profiles by fullName (partial match, case-insensitive)
    @GetMapping("/search/{name}")
    public ResponseEntity<List<UserProfile>> searchProfilesByName(@PathVariable String name) {
        List<UserProfile> matches = userProfileRepository.findByFullNameContainingIgnoreCase(name);
        return ResponseEntity.ok(matches);
    }
}
