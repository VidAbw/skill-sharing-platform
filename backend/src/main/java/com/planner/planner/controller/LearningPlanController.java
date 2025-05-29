package com.planner.planner.controller;

import com.planner.planner.model.LearningMilestone;
import com.planner.planner.model.LearningPlan;
import com.planner.planner.model.LearningResource;
import com.planner.planner.services.LearningPlanService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

//Added components into Learning Plan Controller

@RestController
@RequestMapping("/api/plans")
@CrossOrigin("http://localhost:5173")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    @PostMapping
    public ResponseEntity<LearningPlan> createPlan(@RequestBody LearningPlan plan) {
        return new ResponseEntity<>(learningPlanService.createPlan(plan), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LearningPlan>> getAllPlans() {
        return ResponseEntity.ok(learningPlanService.getAllLearningPlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(learningPlanService.getPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updatePlan(@PathVariable Long id, @RequestBody LearningPlan plan) {
        return ResponseEntity.ok(learningPlanService.updatePlan(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        learningPlanService.deletePlan(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<LearningPlan>> getPlansBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(learningPlanService.getPlansBySubject(subject));
    }

    @GetMapping("/status/completed")
    public ResponseEntity<List<LearningPlan>> getCompletedPlans() {
        return ResponseEntity.ok(learningPlanService.getCompletedPlans());
    }

    @GetMapping("/status/in-progress")
    public ResponseEntity<List<LearningPlan>> getInProgressPlans() {
        return ResponseEntity.ok(learningPlanService.getInProgressPlans());
    }

    @GetMapping("/status/not-started")
    public ResponseEntity<List<LearningPlan>> getNotStartedPlans() {
        return ResponseEntity.ok(learningPlanService.getNotStartedPlans());
    }

    @PatchMapping("/{id}/progress")
    public ResponseEntity<LearningPlan> updateProgress(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> progressUpdate) {
        Integer newPercentage = progressUpdate.get("completionPercentage");
        return ResponseEntity.ok(learningPlanService.updateProgress(id, newPercentage));
    }

    @PostMapping("/{id}/resources")
    public ResponseEntity<LearningPlan> addResource(
            @PathVariable Long id,
            @RequestBody LearningResource resource) {
        return ResponseEntity.ok(learningPlanService.addResource(id, resource));
    }

    @PatchMapping("/{planId}/resources/{resourceId}/complete")
    public ResponseEntity<LearningPlan> markResourceCompleted(
            @PathVariable Long planId,
            @PathVariable Long resourceId) {
        return ResponseEntity.ok(learningPlanService.markResourceCompleted(planId, resourceId));
    }

    @PostMapping("/{id}/milestones")
    public ResponseEntity<LearningPlan> addMilestone(
            @PathVariable Long id,
            @RequestBody LearningMilestone milestone) {
        return ResponseEntity.ok(learningPlanService.addMilestone(id, milestone));
    }

    @PatchMapping("/{planId}/milestones/{milestoneId}/complete")
    public ResponseEntity<LearningPlan> completeMilestone(
            @PathVariable Long planId,
            @PathVariable Long milestoneId) {
        return ResponseEntity.ok(learningPlanService.completeMilestone(planId, milestoneId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<LearningPlan>> searchPlans(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Double maxHours) {
        if (subject != null) {
            return ResponseEntity.ok(learningPlanService.getPlansBySubject(subject));
        }
        if (difficulty != null) {
            return ResponseEntity.ok(learningPlanService.getPlansByDifficulty(difficulty));
        }
        if (startDate != null && endDate != null) {
            return ResponseEntity.ok(learningPlanService.getPlansByDateRange(startDate, endDate));
        }
        if (maxHours != null) {
            return ResponseEntity.ok(learningPlanService.getPlansByEstimatedHours(maxHours));
        }
        return ResponseEntity.ok(learningPlanService.getAllLearningPlans());
    }

    @GetMapping("/shared")
    public ResponseEntity<List<LearningPlan>> getSharedPlans() {
        return ResponseEntity.ok(learningPlanService.getSharedPlans());
    }

    @PostMapping("/{id}/share")
    public ResponseEntity<LearningPlan> sharePlan(
            @PathVariable Long id,
            @RequestBody Map<String, Object> shareDetails) {
        Boolean isPublic = (Boolean) shareDetails.get("isPublic");
        String learningInsights = (String) shareDetails.get("learningInsights");
        return ResponseEntity.ok(learningPlanService.sharePlan(id, isPublic, learningInsights));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<LearningPlan> createPlan(
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam(value = "title", required = true) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "destination", required = false) String destination,
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(value = "difficulty", required = false) String difficulty,
            @RequestParam(value = "estimatedHours", required = false) Double estimatedHours,
            @RequestParam(value = "prerequisites", required = false) String prerequisites,
            @RequestParam(value = "learningGoals", required = false) String learningGoals,
            @RequestParam(value = "travel_type", required = false) String travel_type,
            @RequestParam(value = "subject", required = false) String subject,
            @RequestParam(value = "currency", required = false) String currency,
            @RequestParam(value = "accommodation", required = false) String accommodation,
            @RequestParam(value = "budget", required = false) String budget,
            @RequestParam(value = "transportationType", required = false) String transportationType,
            @RequestParam(value = "travelGoals", required = false) String travelGoals,
            @RequestParam(value = "culturalInterests", required = false) String culturalInterests
    ) {
        try {
            LearningPlan plan = new LearningPlan();
            plan.setTitle(title);
            plan.setDescription(description);
            plan.setDestination(destination);
            plan.setStartDate(startDate);
            plan.setEndDate(endDate);
            plan.setDifficulty(difficulty);
            plan.setEstimatedHours(estimatedHours);
            plan.setPrerequisites(prerequisites);
            plan.setLearningGoals(learningGoals);
            plan.setTravel_type(travel_type);
            plan.setSubject(subject);
            plan.setCurrency(currency);
            plan.setAccommodation(accommodation);
            plan.setBudget(budget);
            plan.setTransportationType(transportationType);
            plan.setTravelGoal(travelGoals);
            plan.setCulturalInterests(culturalInterests);

            if (imageFile != null && !imageFile.isEmpty()) {
                System.out.println("Received image: " + imageFile.getOriginalFilename());
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    System.out.println("Creating upload directory: " + uploadPath);
                    Files.createDirectories(uploadPath);
                }
                String filename = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                System.out.println("Saving file to: " + filePath);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                plan.setImageUrl(filename);
                System.out.println("Image saved as: " + filename);
            }

            LearningPlan createdPlan = learningPlanService.createPlan(plan);
            return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<LearningPlan> updatePlanWithImage(
            @PathVariable Long id,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam(value = "title", required = true) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "destination", required = false) String destination,
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(value = "difficulty", required = false) String difficulty,
            @RequestParam(value = "estimatedHours", required = false) Double estimatedHours,
            @RequestParam(value = "prerequisites", required = false) String prerequisites,
            @RequestParam(value = "learningGoals", required = false) String learningGoals,
            @RequestParam(value = "travel_type", required = false) String travel_type,
            @RequestParam(value = "subject", required = false) String subject,
            @RequestParam(value = "currency", required = false) String currency,
            @RequestParam(value = "accommodation", required = false) String accommodation,
            @RequestParam(value = "budget", required = false) String budget,
            @RequestParam(value = "transportationType", required = false) String transportationType,
            @RequestParam(value = "goals", required = false) String goals,
            @RequestParam(value = "culturalInterests", required = false) String culturalInterests,
            @RequestParam(value = "destinations", required = false) String destinationsJson,
            @RequestParam(value = "activities", required = false) String activitiesJson
    ) {
        try {
            LearningPlan existingPlan = learningPlanService.getPlanById(id);

            // Update fields
            existingPlan.setTitle(title);
            existingPlan.setDescription(description);
            existingPlan.setDestination(destination);
            existingPlan.setStartDate(startDate);
            existingPlan.setEndDate(endDate);
            existingPlan.setDifficulty(difficulty);

            if (estimatedHours != null) {
                existingPlan.setEstimatedHours(estimatedHours);
            }

            existingPlan.setPrerequisites(prerequisites);
            existingPlan.setLearningGoals(learningGoals);
            existingPlan.setTravel_type(travel_type);
            existingPlan.setSubject(subject);
            existingPlan.setCurrency(currency);
            existingPlan.setAccommodation(accommodation);
            existingPlan.setBudget(budget);
            existingPlan.setTransportationType(transportationType);
            existingPlan.setTravelGoal(goals);
            existingPlan.setCulturalInterests(culturalInterests);

            // Handle destinations and activities JSON if provided
            // Use Jackson or similar to parse these from strings to objects

            // Handle image upload
            if (imageFile != null && !imageFile.isEmpty()) {
                System.out.println("Updating image: " + imageFile.getOriginalFilename());
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    System.out.println("Creating upload directory: " + uploadPath);
                    Files.createDirectories(uploadPath);
                }

                // Delete old image if it exists
                if (existingPlan.getImageUrl() != null) {
                    try {
                        Path oldFilePath = uploadPath.resolve(existingPlan.getImageUrl());
                        Files.deleteIfExists(oldFilePath);
                    } catch (IOException e) {
                        System.out.println("Could not delete old image: " + e.getMessage());
                    }
                }

                String filename = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                System.out.println("Saving file to: " + filePath);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                existingPlan.setImageUrl(filename);
                System.out.println("Image saved as: " + filename);
            }

            LearningPlan updatedPlan = learningPlanService.updatePlan(id, existingPlan);
            return ResponseEntity.ok(updatedPlan);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}