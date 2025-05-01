package com.travelconnect.backend.controller;

import com.travelconnect.backend.model.Like;
import com.travelconnect.backend.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.transaction.Transactional;




@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "*") // allow frontend to access API


public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    // ✅ Like a post
    @PostMapping
    public ResponseEntity<?> likePost(@RequestBody Like like) {
        boolean alreadyLiked = likeRepository.findByUserIdAndPostId(like.getUserId(), like.getPostId()).isPresent();
        if (alreadyLiked) {
            return ResponseEntity.badRequest().body("You already liked this post.");
        }
        Like saved = likeRepository.save(like);
        return ResponseEntity.ok(saved);
    }

    // ❌ Unlike a post
    
    @DeleteMapping
@Transactional
public ResponseEntity<?> unlikePost(@RequestBody Like like) {
    likeRepository.deleteByUserIdAndPostId(like.getUserId(), like.getPostId());
    return ResponseEntity.ok("Unliked successfully.");
}

    // 🔢 Get like count for a post
    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        long count = likeRepository.countByPostId(postId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/post/{postId}/user/{userId}")
public ResponseEntity<Like> checkIfLiked(@PathVariable Long postId, @PathVariable Long userId) {
    return likeRepository.findByUserIdAndPostId(userId, postId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

}
