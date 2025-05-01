import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/FollowButton.css"; // Import the CSS

const FollowButton = ({ currentUserId, targetUserId, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check initially if user is already following
  const checkFollowing = async () => {
    try {
      const res = await axios.get(`/follows/followers/${targetUserId}`);
      const match = res.data.find((f) => f.followerId === currentUserId);
      setIsFollowing(!!match);
    } catch (err) {
      console.error("❌ Failed to check following status:", err);
    }
  };

  useEffect(() => {
    if (currentUserId && targetUserId) {
      checkFollowing();
    }
  }, [currentUserId, targetUserId]);

  // ✅ Toggle follow/unfollow
  const handleToggleFollow = async () => {
    if (loading) return; // prevent double clicking
    setLoading(true);

    try {
      if (isFollowing) {
        await axios({
          method: "delete",
          url: "/follows",
          data: { followerId: currentUserId, followingId: targetUserId },
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axios.post(
          "/follows",
          { followerId: currentUserId, followingId: targetUserId },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      setIsFollowing((prev) => !prev);
      if (onFollowChange) {
        onFollowChange();
      }
    } catch (err) {
      console.error("❌ Failed to update follow status:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`follow-btn ${isFollowing ? "following" : "follow"} ${
        loading ? "loading" : ""
      }`}
      onClick={handleToggleFollow}
      disabled={loading}
    >
      {loading ? "Processing..." : isFollowing ? "✔ Following" : "+ Follow"}
    </button>
  );
};

export default FollowButton;
