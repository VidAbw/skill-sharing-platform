package com.travelconnect.backend.controller;

import com.travelconnect.backend.model.Comment;
import com.travelconnect.backend.model.User;
import com.travelconnect.backend.repository.CommentRepository;
import com.travelconnect.backend.repository.UserRepository;
import com.travelconnect.backend.DTO.CommentDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create a comment
    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        Comment saved = commentRepository.save(comment);
        return ResponseEntity.ok(saved);
    }

    // ✅ Update a comment
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        return commentRepository.findById(id)
            .map(comment -> {
                comment.setContent(updatedComment.getContent());
                Comment saved = commentRepository.save(comment);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete a comment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        if (!commentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        commentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ✅ Get all comments for a post (but this time we require postOwnerId from frontend)
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(
        @PathVariable Long postId,
        @RequestParam("postOwnerId") Long postOwnerId // ✅ now postOwnerId passed as query param
    ) {
        List<Comment> comments = commentRepository.findByPostId(postId);

        List<CommentDTO> commentDTOs = comments.stream()
            .map(comment -> {
                User user = userRepository.findById(comment.getUserId()).orElse(null);
                String userName = (user != null) ? user.getFullName() : "Unknown User";

                return new CommentDTO(
                    comment.getId(),
                    comment.getContent(),
                    comment.getCreatedAt().toString(),
                    comment.getUserId(),
                    userName,
                    postOwnerId // ✅ real correct owner ID coming from frontend
                );
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(commentDTOs);
    }

    // ✅ (Optional) Get all comments made by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable Long userId) {
        List<Comment> comments = commentRepository.findByUserId(userId);
        return ResponseEntity.ok(comments);
    }
}
