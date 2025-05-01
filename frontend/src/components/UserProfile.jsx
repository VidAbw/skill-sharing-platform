import React from "react";
import CommentSection from "../components/CommentSection";
import LikeButton from "../components/LikeButton"; // Import the LikeButton component

const UserProfile = ({ userName, currentUserId }) => {
  // Hardcoded all posts here
  const posts = [
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

  // Filter posts where post.ownerName matches the currently viewed user's name
  const userPosts = posts.filter((post) => post.ownerName === userName);

  return (
    <div className="user-posts-section">
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post.postId} className="post-card">
            <h4>{post.postTitle}</h4>
            <p>{post.postContent}</p>
            <small>Posted by {post.ownerName}</small>
            {/* ✅ Add LikeButton here */}
            <div style={{ marginTop: "10px" }}>
              <LikeButton postId={post.postId} userId={currentUserId} />
            </div>
            {/* Comment Section */}
            <CommentSection
              postId={post.postId}
              currentUserId={currentUserId}
              currentUserName={userName}
              postOwnerId={post.ownerId}
            />
          </div>
        ))
      ) : (
        <p>No posts available for this user.</p>
      )}
    </div>
  );
};

export default UserProfile;
