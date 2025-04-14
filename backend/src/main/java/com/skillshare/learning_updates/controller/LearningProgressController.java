

package com.skillshare.learning_updates.controller;
import org.springframework.beans.factory.annotation.Autowired;
import com.skillshare.learning_updates.model.LearningProgress;
import com.skillshare.learning_updates.service.LearningProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/learning-progress")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningProgressController {
    @Autowired
    private LearningProgressService service;
    
    @GetMapping
    public ResponseEntity<List<LearningProgress>> getAllLearningProgress() {
        return ResponseEntity.ok(service.getAllLearningProgress());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningProgress>> getLearningProgressByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getLearningProgressByUser(userId));
    }
    
    @PostMapping
    public ResponseEntity<LearningProgress> createLearningProgress(@RequestBody LearningProgress progress) {
        return new ResponseEntity<>(service.createLearningProgress(progress), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LearningProgress> updateLearningProgress(@PathVariable Long id, @RequestBody LearningProgress progress) {
        return service.updateLearningProgress(id, progress)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningProgress(@PathVariable Long id) {
        if (service.deleteLearningProgress(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}