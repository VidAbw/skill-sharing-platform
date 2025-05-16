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
    // POST - Create new travel guide
    @PostMapping
    public ResponseEntity<TravelGuide> createTravelGuide(@RequestBody TravelGuide travelGuide) {
        TravelGuide savedGuide = service.createTravelGuide(travelGuide);
        return ResponseEntity.ok(savedGuide);
    }

    // PUT - Update existing travel guide
    @PutMapping("/{id}")
    public ResponseEntity<TravelGuide> updateTravelGuide(
            @PathVariable Long id,
            @RequestBody TravelGuide travelGuide) {
        return service.updateTravelGuide(id, travelGuide)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE travel guide
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTravelGuide(@PathVariable Long id) {
        if (service.deleteTravelGuide(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
