package com.skillshare.learning_updates.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillshare.learning_updates.model.TravelGuide;
import com.skillshare.learning_updates.repository.TravelGuideRepository;
import java.util.List;
import java.util.Optional;
@Service
public class TravelGuideService {
        @Autowired
    private TravelGuideRepository repository;
    
    public List<TravelGuide> getAllTravelGuides() {
        return repository.findAll();
    }
    
    public List<TravelGuide> getTravelGuidesByDestination(String destination) {
        return repository.findByDestinationContainingIgnoreCase(destination);
    }
    
    public List<TravelGuide> getTravelGuidesByTopic(String topic) {
        return repository.findByTopicContainingIgnoreCase(topic);
    }
    
    public Optional<TravelGuide> getTravelGuideById(Long id) {
        return repository.findById(id);
    }
}
