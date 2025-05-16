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

    // POST - Create new travel guide
    public TravelGuide createTravelGuide(TravelGuide travelGuide) {
        return repository.save(travelGuide);
    }

    // PUT - Update existing travel guide
    public Optional<TravelGuide> updateTravelGuide(Long id, TravelGuide updatedGuide) {
        return repository.findById(id)
                .map(existingGuide -> {
                    // Update the existing guide with new values
                    existingGuide.setDestination(updatedGuide.getDestination());
                    existingGuide.setTopic(updatedGuide.getTopic());
                    existingGuide.setContent(updatedGuide.getContent());
                    // Add any other fields that need to be updated
                    return repository.save(existingGuide);
                });
    }

    // DELETE travel guide
    public boolean deleteTravelGuide(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
