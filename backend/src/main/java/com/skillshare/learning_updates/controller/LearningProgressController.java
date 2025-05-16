package com.skillshare.learning_updates.controller;

import com.skillshare.learning_updates.DTO.LearningProgressDTO;
import com.skillshare.learning_updates.model.LearningProgress;
import com.skillshare.learning_updates.model.User;
import com.skillshare.learning_updates.service.LearningProgressService;
import com.skillshare.learning_updates.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/learning-progress")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningProgressController {
    @Autowired
    private LearningProgressService progressService;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping
    public ResponseEntity<List<LearningProgressDTO>> getAllLearningProgress() {
        List<LearningProgressDTO> progressList = progressService.getAllLearningProgress()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(progressList);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningProgressDTO>> getLearningProgressByUser(@PathVariable Long userId) {
        List<LearningProgressDTO> progressList = progressService.getLearningProgressByUser(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(progressList);
    }

    @PostMapping
    public ResponseEntity<LearningProgressDTO> createLearningProgress(
            @RequestBody LearningProgressDTO progressDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LearningProgress progress = convertToEntity(progressDTO);
        progress.setUser(user);

        LearningProgress savedProgress = progressService.createLearningProgress(progress);
        return new ResponseEntity<>(convertToDTO(savedProgress), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningProgressDTO> updateLearningProgress(
            @PathVariable Long id,
            @RequestBody LearningProgressDTO progressDTO) {

        return progressService.updateLearningProgress(id, convertToEntity(progressDTO))
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningProgress(@PathVariable Long id) {
        if (progressService.deleteLearningProgress(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Helper methods
    private LearningProgressDTO convertToDTO(LearningProgress progress) {
        return new LearningProgressDTO(
                progress.getId(),
                progress.getTitle(),
                progress.getContent(),
                progress.getCreatedAt(),
                progress.getUpdatedAt(),
                progress.getUser().getId()
        );
    }

    private LearningProgress convertToEntity(LearningProgressDTO dto) {
        LearningProgress progress = new LearningProgress();
        progress.setId(dto.getId());
        progress.setTitle(dto.getTitle());
        progress.setContent(dto.getContent());
        return progress;
    }
}