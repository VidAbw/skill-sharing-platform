package com.skillshare.learning_updates.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.skillshare.learning_updates.model.TravelGuide;

public interface TravelGuideRepository extends JpaRepository<TravelGuide, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find travel guides by a specific attribute:
    // List<TravelGuide> findByAttributeName(String attributeName);
    List<TravelGuide> findByDestinationContainingIgnoreCase(String destination);
    List<TravelGuide> findByTopicContainingIgnoreCase(String topic);
    
}
