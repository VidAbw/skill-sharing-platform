package com.planner.planner.services;

import com.planner.planner.model.LearningMilestone;
import com.planner.planner.model.LearningPlan;
import com.planner.planner.model.LearningResource;
import com.planner.planner.repository.LearningPlanRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LearningPlanService {
    @Autowired
    private LearningPlanRepository learningPlanRepository;

    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    public LearningPlan createPlan(LearningPlan plan) {
        // Validate dates
        if (plan.getStartDate() != null && plan.getEndDate() != null &&
                plan.getEndDate().isBefore(plan.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        return learningPlanRepository.save(plan);
    }

    public LearningPlan getPlanById(Long id) {
        return learningPlanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Travel plan not found"));
    }

    public LearningPlan updatePlan(Long id, LearningPlan plan) {
        var existingPlan = getPlanById(id);
        existingPlan.setTitle(plan.getTitle());
        existingPlan.setImageUrl(plan.getImageUrl());
        existingPlan.setDescription(plan.getDescription());
        existingPlan.setTravel_type(plan.getTravel_type());
        existingPlan.setStartDate(plan.getStartDate());
        existingPlan.setEndDate(plan.getEndDate());
        existingPlan.setDifficulty(plan.getDifficulty());
        existingPlan.setEstimatedHours(plan.getEstimatedHours());
        existingPlan.setPrerequisites(plan.getPrerequisites());
        existingPlan.setLearningGoals(plan.getLearningGoals());
        existingPlan.setCompletionPercentage(plan.getCompletionPercentage());
        existingPlan.setTopics(plan.getTopics());
        existingPlan.setResources(plan.getResources());
        existingPlan.setMilestones(plan.getMilestones());
        existingPlan.setSubject(plan.getSubject());
        existingPlan.setCurrency(plan.getCurrency());
        existingPlan.setAccommodation(plan.getAccommodation());
        existingPlan.setBudget(plan.getBudget());
        existingPlan.setTransportationType(plan.getTransportationType());
        existingPlan.setTravelGoal(plan.getTravelGoal());
        existingPlan.setCulturalInterests(plan.getCulturalInterests());
        return learningPlanRepository.save(existingPlan);
    }

    public void deletePlan(Long id) {
        var plan = getPlanById(id);

        learningPlanRepository.delete(plan);
    }

    public List<LearningPlan> getPlansBySubject(String subject) {
        return learningPlanRepository.findBySubject(subject);
    }

    public List<LearningPlan> getCompletedPlans() {
        return learningPlanRepository.findByCompletionPercentage(100);
    }

    public List<LearningPlan> getInProgressPlans() {
        return learningPlanRepository.findByCompletionPercentageGreaterThan(0);
    }

    public List<LearningPlan> getNotStartedPlans() {
        return learningPlanRepository.findByCompletionPercentage(0);
    }

    public LearningPlan updateProgress(Long id, Integer newPercentage) {
        LearningPlan plan = getPlanById(id);
        plan.setCompletionPercentage(newPercentage);
        return learningPlanRepository.save(plan);
    }

    public LearningPlan addResource(Long planId, LearningResource resource) {
        LearningPlan plan = getPlanById(planId);
        plan.getResources().add(resource);
        return learningPlanRepository.save(plan);
    }

    public LearningPlan markResourceCompleted(Long planId, Long resourceId) {
        LearningPlan plan = getPlanById(planId);
        plan.getResources().stream()
                .filter(r -> r.getId().equals(resourceId))
                .findFirst()
                .ifPresent(r -> r.setCompleted(true));
        return learningPlanRepository.save(plan);
    }

    public LearningPlan addMilestone(Long planId, LearningMilestone milestone) {
        LearningPlan plan = getPlanById(planId);
        plan.getMilestones().add(milestone);
        return learningPlanRepository.save(plan);
    }

    public LearningPlan completeMilestone(Long planId, Long milestoneId) {
        LearningPlan plan = getPlanById(planId);
        plan.getMilestones().stream()
                .filter(m -> m.getId().equals(milestoneId))
                .findFirst()
                .ifPresent(m -> m.setCompleted(true));

        // Recalculate completion percentage
        long completedMilestones = plan.getMilestones().stream()
                .filter(LearningMilestone::getCompleted)
                .count();

        int totalMilestones = plan.getMilestones().size();
        if (totalMilestones > 0) {
            plan.setCompletionPercentage((int)((completedMilestones * 100) / totalMilestones));
        }

        return learningPlanRepository.save(plan);
    }

    public List<LearningPlan> getPlansByDifficulty(String difficulty) {
        return learningPlanRepository.findByDifficulty(difficulty);
    }

    public List<LearningPlan> getPlansByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return learningPlanRepository.findByStartDateBetween(startDate, endDate);
    }

    public List<LearningPlan> getPlansByEstimatedHours(Double maxHours) {
        return learningPlanRepository.findByEstimatedHoursLessThan(maxHours);
    }

    public List<LearningPlan> getSharedPlans() {
        return learningPlanRepository.findByIsPublicTrue();
    }

    public LearningPlan sharePlan(Long id, Boolean isPublic, String learningInsights) {
        LearningPlan plan = getPlanById(id);
        plan.setIsPublic(isPublic);
        // Optionally, save learning insights to a log or database
        return learningPlanRepository.save(plan);
    }
}
