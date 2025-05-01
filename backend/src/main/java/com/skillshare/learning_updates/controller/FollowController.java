package com.skillshare.learning_updates.controller;

import com.skillshare.learning_updates.model.Follow;
import com.skillshare.learning_updates.repository.FollowRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follows")
@CrossOrigin(origins = "*")
public class FollowController {

    @Autowired
    private FollowRepository followRepository;

    // ✅ Follow a user
    @PostMapping
    public ResponseEntity<?> followUser(@RequestBody Follow follow) {
        boolean alreadyFollowing = followRepository
            .findByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId())
            .isPresent();

        if (alreadyFollowing) {
            return ResponseEntity.badRequest().body("Already following this user.");
        }

        Follow saved = followRepository.save(follow);
        return ResponseEntity.ok(saved);
    }

    // ❌ Unfollow a user
    @DeleteMapping
    @Transactional
    public ResponseEntity<?> unfollowUser(@RequestBody Follow follow) {
        followRepository.deleteByFollowerIdAndFollowingId(follow.getFollowerId(), follow.getFollowingId());
        return ResponseEntity.ok("Unfollowed successfully.");
    }

    // 🔍 Get followers of a user
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Follow>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(followRepository.findByFollowingId(userId));
    }

    // 🔍 Get following list of a user
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Follow>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(followRepository.findByFollowerId(userId));
    }
}
