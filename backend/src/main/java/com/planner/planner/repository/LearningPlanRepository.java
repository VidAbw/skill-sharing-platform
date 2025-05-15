package com.planner.planner.repository;

import com.planner.planner.model.LearningPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findBySubject(String subject);
    List<LearningPlan> findByCompletionPercentage(Integer completionPercentage);
    List<LearningPlan> findByCompletionPercentageLessThan(Integer completionPercentage);
    List<LearningPlan> findByCompletionPercentageGreaterThan(Integer completionPercentage);
    List<LearningPlan> findByDifficulty(String difficulty);
    List<LearningPlan> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    List<LearningPlan> findByEstimatedHoursLessThan(Double hours);
    List<LearningPlan> findByIsPublicTrue();
}

