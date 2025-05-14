import React, { useEffect, useState, useContext } from "react";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/AuthContext";
import "../styles/Homepage.css";

// 🔒 All hardcoded posts from all users
const allPostsData = [
  {
    postId: 1,
    postTitle: "My First Travel Experience 🌍",
    postContent:
      "I visited Ella, Sri Lanka, and it was an amazing adventure! The views were breathtaking.",
    ownerId: 4,
    ownerName: "S L D C Karunarathne",
  },
  {
    postId: 2,
    postTitle: "Hiking at Adam's Peak 🏞️",
    postContent:
      "The climb was challenging but the sunrise view was truly magical!",
    ownerId: 4,
    ownerName: "S L D C Karunarathne",
  },
  {
    postId: 3,
    postTitle: "Exploring Colombo 🏙️",
    postContent:
      "Colombo is full of life! The food, the beaches, and the people were amazing!",
    ownerId: 5,
    ownerName: "M S S Meegoda",
  },
  {
    postId: 4,
    postTitle: "Trip to Nuwara Eliya 🌸",
    postContent:
      "Tea plantations and cool breeze made it a beautiful getaway.",
    ownerId: 5,
    ownerName: "M S S Meegoda",
  },
];

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        setAllPosts(allPostsData);
      } catch (err) {
        console.error("❌ Failed to fetch all posts", err);
      }
    };

    loadAllPosts();
  }, []); // Empty dependency array since allPostsData is now static

  return (
    <div className="homepage-container">
      <h2 className="homepage-title">ExploreHub Feed</h2>

      {allPosts.length === 0 && <p>No posts available.</p>}

      {allPosts.map((post) => (
        <div className="post-card" key={post.postId}>
          <h4>{post.postTitle}</h4>
          <p>{post.postContent}</p>
          <small>Posted by {post.ownerName}</small>

          <div style={{ marginTop: "10px" }}>
            <LikeButton postId={post.postId} userId={user.id} />
          </div>

          <CommentSection
            postId={post.postId}
            currentUserId={user.id}
            currentUserName={user.fullName}
            postOwnerId={post.ownerId}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
