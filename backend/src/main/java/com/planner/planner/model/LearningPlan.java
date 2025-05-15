package com.planner.planner.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "travel_learning_plans")
@Data
public class LearningPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    private String title;

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    private String description;

    private String budget;

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    private String currency;

    public String getTravel_type() {
        return travel_type;
    }

    private String subject;
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public void setTravel_type(String travel_type) {
        this.travel_type = travel_type;
    }

    public Boolean getPublic() {
        return isPublic;
    }

    public void setPublic(Boolean aPublic) {
        isPublic = aPublic;
    }

    private String travel_type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED
    private Double estimatedHours;

    private String accommodation;

    public String getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(String accommodation) {
        this.accommodation = accommodation;
    }

    @Column(length = 1000)
    private String prerequisites;

    @Column(length = 1000)
    private String learningGoals;

    private Integer completionPercentage;

    private String destination;

    @Column(nullable = false)
    private String name;

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Boolean getBooked() {
        return booked;
    }

    public void setBooked(Boolean booked) {
        this.booked = booked;
    }

    public LearningPlan getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(LearningPlan learningPlan) {
        this.learningPlan = learningPlan;
    }

    @Column(length = 1000)
    private String descript;

    private LocalDateTime date;

    private Boolean booked = false;

    @ManyToOne
    @JoinColumn(name = "learning_plan_id")
    private LearningPlan learningPlan;

    public String getCulturalInterests() {
        return culturalInterests;
    }

    public void setCulturalInterests(String culturalInterests) {
        this.culturalInterests = culturalInterests;
    }

    private String culturalInterests;

    @Column(name = "transportation_type")
    private String transportationType;

    public String getTransportationType() {
        return this.transportationType;
    }

    public void setTransportationType(String transportationType) {
        this.transportationType = transportationType;
    }



    private Boolean isPublic = false;

    public String getTravelGoal() {
        return travelGoal;
    }

    public void setTravelGoal(String travelGoal) {
        this.travelGoal = travelGoal;
    }

    private String travelGoal;

    // Getters and setters
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    @ElementCollection
    private List<String> topics;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningResource> resources;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningMilestone> milestones;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getDifficulty() {
        return difficulty;
    }




    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Double getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Double estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getLearningGoals() {
        return learningGoals;
    }

    public void setLearningGoals(String learningGoals) {
        this.learningGoals = learningGoals;
    }

    public Integer getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(Integer completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    public List<LearningResource> getResources() {
        return resources;
    }

    public void setResources(List<LearningResource> resources) {
        this.resources = resources;
    }

    public List<LearningMilestone> getMilestones() {
        return milestones;
    }

    public void setMilestones(List<LearningMilestone> milestones) {
        this.milestones = milestones;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.completionPercentage == null) {
            this.completionPercentage = 0;
        }
    }
}
