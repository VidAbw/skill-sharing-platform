package com.skillshare.learning_updates.controller;
import com.skillshare.learning_updates.model.TravelGuide;
import com.skillshare.learning_updates.service.TravelGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/travel-guides")
@CrossOrigin(origins = "http://localhost:3000")
public class TravelGuideController {
    @Autowired
    private TravelGuideService service;
    
    @GetMapping
    public ResponseEntity<List<TravelGuide>> getAllTravelGuides() {
        return ResponseEntity.ok(service.getAllTravelGuides());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TravelGuide> getTravelGuideById(@PathVariable Long id) {
        return service.getTravelGuideById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/destination")
    public ResponseEntity<List<TravelGuide>> getTravelGuidesByDestination(@RequestParam String search) {
        return ResponseEntity.ok(service.getTravelGuidesByDestination(search));
    }
    
    @GetMapping("/topic")
    public ResponseEntity<List<TravelGuide>> getTravelGuidesByTopic(@RequestParam String search) {
        return ResponseEntity.ok(service.getTravelGuidesByTopic(search));
    } 
}
