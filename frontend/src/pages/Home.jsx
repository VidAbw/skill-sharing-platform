import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/AuthContext";
import "../styles/HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [followedUserIds, setFollowedUserIds] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  // 🔒 All hardcoded posts from all users
  const allPosts = [
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

  useEffect(() => {
    const loadFollowedUserPosts = async () => {
      try {
        const res = await axios.get(`/follows/following/${user.id}`);
        const followingIds = res.data.map((f) => f.followingId);
        setFollowedUserIds(followingIds);

        const filtered = allPosts.filter((post) =>
          followingIds.includes(post.ownerId)
        );
        setVisiblePosts(filtered);
      } catch (err) {
        console.error("❌ Failed to fetch followed posts", err);
      }
    };

    if (user?.id) {
      loadFollowedUserPosts();
    }
  }, [user]);

  return (
    <div className="homepage-container">
      <h2 className="homepage-title">ExploreHub Feed</h2>

      {visiblePosts.length === 0 && <p>No posts from followed users.</p>}

      {visiblePosts.map((post) => (
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
