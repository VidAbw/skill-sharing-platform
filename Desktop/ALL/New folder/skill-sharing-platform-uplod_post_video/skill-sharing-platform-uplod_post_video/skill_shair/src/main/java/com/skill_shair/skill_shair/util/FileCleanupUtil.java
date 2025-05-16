package com.skill_shair.skill_shair.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Component
public class FileCleanupUtil {
    private static final Logger logger = LoggerFactory.getLogger(FileCleanupUtil.class);
    
    @Value("${app.uploads.max-file-size-mb:100}")
    private long maxFileSizeMb;
    
    private final Path uploadsDir = Paths.get("uploads");

    /**
     * Delete files larger than the specified threshold
     * @return Number of files deleted
     */
    public int cleanupLargeFiles() {
        int deletedCount = 0;
        long maxSizeBytes = maxFileSizeMb * 1024 * 1024; // Convert MB to bytes
        
        if (!Files.exists(uploadsDir)) {
            return 0;
        }
        
        try (Stream<Path> paths = Files.walk(uploadsDir)) {
            deletedCount = paths
                .filter(Files::isRegularFile)
                .filter(path -> {
                    try {
                        return Files.size(path) > maxSizeBytes;
                    } catch (IOException e) {
                        return false;
                    }
                })
                .map(Path::toFile)
                .mapToInt(file -> {
                    boolean deleted = file.delete();
                    if (deleted) {
                        logger.info("Deleted large file: {} ({}MB)", 
                            file.getName(), 
                            file.length() / (1024 * 1024));
                        return 1;
                    }
                    return 0;
                })
                .sum();
        } catch (IOException e) {
            logger.error("Error cleaning up large files", e);
        }
        
        return deletedCount;
    }
    
    /**
     * Delete all files in the uploads directory
     * @return Number of files deleted
     */
    public int cleanupAllFiles() {
        int deletedCount = 0;
        
        if (!Files.exists(uploadsDir)) {
            return 0;
        }
        
        try (Stream<Path> paths = Files.walk(uploadsDir)) {
            deletedCount = paths
                .filter(Files::isRegularFile)
                .map(Path::toFile)
                .mapToInt(file -> {
                    boolean deleted = file.delete();
                    if (deleted) {
                        logger.info("Deleted file: {}", file.getName());
                        return 1;
                    }
                    return 0;
                })
                .sum();
        } catch (IOException e) {
            logger.error("Error cleaning up files", e);
        }
        
        return deletedCount;
    }
}
