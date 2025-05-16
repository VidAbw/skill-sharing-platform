// SkillSharingPostController.java
package com.skill_shair.skill_shair.controller;

import com.skill_shair.skill_shair.model.Post;
import com.skill_shair.skill_shair.repository.PostRepository;
import com.skill_shair.skill_shair.util.FileCleanupUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PostController {

    private static final Path UPLOAD_DIR = Paths.get("uploads");

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private FileCleanupUtil fileCleanupUtil;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(UPLOAD_DIR);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Create Post (JSON)
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
    }

    // Create Post with Media
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadPost(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos,
            @RequestParam(value = "video", required = false) MultipartFile video
    ) {
        try {
            Post post = new Post();
            post.setTitle(title);
            post.setDescription(description);

            List<String> photoPaths = new ArrayList<>();
            if (photos != null) {
                for (MultipartFile file : photos) {
                    String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = UPLOAD_DIR.resolve(filename);
                    Files.createDirectories(filePath.getParent());
                    Files.write(filePath, file.getBytes());
                    photoPaths.add("/uploads/" + filename);
                }
            }
            post.setPhotoPaths(photoPaths);

            if (video != null && !video.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + video.getOriginalFilename();
                Path filePath = UPLOAD_DIR.resolve(filename);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, video.getBytes());
                post.setVideoPath("/uploads/" + filename);
            }

            postRepository.save(post);
            return ResponseEntity.ok("Post created successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create post");
        }
    }

    // Get All Posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get Single Post
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update Post
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updatePost(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos,
            @RequestParam(value = "video", required = false) MultipartFile video
    ) {
        try {
            Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

            post.setTitle(title);
            post.setDescription(description);

            if (photos != null) {
                if (post.getPhotoPaths() != null) {
                    for (String oldPath : post.getPhotoPaths()) {
                        Files.deleteIfExists(UPLOAD_DIR.resolve(oldPath.substring("/uploads/".length())));
                    }
                }
                List<String> newPaths = new ArrayList<>();
                for (MultipartFile file : photos) {
                    String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path path = UPLOAD_DIR.resolve(filename);
                    Files.createDirectories(path.getParent());
                    Files.write(path, file.getBytes());
                    newPaths.add("/uploads/" + filename);
                }
                post.setPhotoPaths(newPaths);
            }

            if (video != null && !video.isEmpty()) {
                if (post.getVideoPath() != null) {
                    Files.deleteIfExists(UPLOAD_DIR.resolve(post.getVideoPath().substring("/uploads/".length())));
                }
                String filename = System.currentTimeMillis() + "_" + video.getOriginalFilename();
                Path path = UPLOAD_DIR.resolve(filename);
                Files.createDirectories(path.getParent());
                Files.write(path, video.getBytes());
                post.setVideoPath("/uploads/" + filename);
            }

            postRepository.save(post);
            return ResponseEntity.ok("Post updated successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update post");
        }
    }

    // Delete Post
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

            if (post.getPhotoPaths() != null) {
                for (String path : post.getPhotoPaths()) {
                    Files.deleteIfExists(UPLOAD_DIR.resolve(path.substring("/uploads/".length())));
                }
            }

            if (post.getVideoPath() != null) {
                Files.deleteIfExists(UPLOAD_DIR.resolve(post.getVideoPath().substring("/uploads/".length())));
            }

            postRepository.deleteById(id);
            return ResponseEntity.ok("Post and files deleted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post");
        }
    }

    // Clean up large files
    @DeleteMapping("/cleanup/large-files")
    public ResponseEntity<String> cleanupLargeFiles() {
        try {
            int count = fileCleanupUtil.cleanupLargeFiles();
            return ResponseEntity.ok("Successfully removed " + count + " large files from uploads directory");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to clean up large files: " + e.getMessage());
        }
    }

    // Clean up all files (admin only)
    @DeleteMapping("/cleanup/all-files")
    public ResponseEntity<String> cleanupAllFiles() {
        try {
            int count = fileCleanupUtil.cleanupAllFiles();
            return ResponseEntity.ok("Successfully removed " + count + " files from uploads directory");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to clean up files: " + e.getMessage());
        }
    }
}
