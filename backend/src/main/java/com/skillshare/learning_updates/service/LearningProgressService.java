package com.skillshare.learning_updates.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillshare.learning_updates.model.LearningProgress;
import com.skillshare.learning_updates.repository.LearningProgressRepository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
@Service
public class LearningProgressService {
    @Autowired
    private LearningProgressRepository repository;
    
    public List<LearningProgress> getAllLearningProgress() {
        return repository.findAll();
    }
    
    public List<LearningProgress> getLearningProgressByUser(Long userId) {
        return repository.findByUserId(userId);
    }
    
    public LearningProgress createLearningProgress(LearningProgress progress) {
        progress.setCreatedAt(LocalDateTime.now());
        progress.setUpdatedAt(LocalDateTime.now());
        return repository.save(progress);
    }
    
    public Optional<LearningProgress> updateLearningProgress(Long id, LearningProgress progress) {
        return repository.findById(id).map(existingProgress -> {
            existingProgress.setTitle(progress.getTitle());
            existingProgress.setContent(progress.getContent());
            existingProgress.setUpdatedAt(LocalDateTime.now());
            return repository.save(existingProgress);
        });
    }
    
    public boolean deleteLearningProgress(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
