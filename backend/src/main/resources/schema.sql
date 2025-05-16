SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS learning_progress;
DROP TABLE IF EXISTS travel_guide;
DROP TABLE IF EXISTS user_profile;
DROP TABLE IF EXISTS user;

-- Create user table
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create learning_progress table
CREATE TABLE learning_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Create follows table
CREATE TABLE follows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    follower_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES user(id),
    FOREIGN KEY (following_id) REFERENCES user(id)
);

-- Create likes table
CREATE TABLE likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Create comments table
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Create travel_guide table
CREATE TABLE travel_guide (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    topic VARCHAR(255)
);

-- Create user_profile table
CREATE TABLE user_profile (
    user_id BIGINT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

SET FOREIGN_KEY_CHECKS = 1; 