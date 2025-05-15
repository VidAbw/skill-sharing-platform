import React, { useEffect, useState, useCallback } from "react";
import axios from "../api/axiosInstance";
import "../styles/LikeButton.css"; // ✅ Import new CSS

const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchLikeData = useCallback(async () => {
    try {
      const countRes = await axios.get(`/api/likes/count/${postId}`);
      setLikeCount(countRes.data);

      const checkRes = await axios
        .get(`/api/likes/post/${postId}/user/${userId}`)
        .catch(() => null);

      if (checkRes?.data?.id) setLiked(true);
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  }, [postId, userId]);

  const handleToggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`/api/likes`, { data: { userId, postId } });
      } else {
        await axios.post(`/api/likes`, { userId, postId });
      }

      setLiked(!liked);
      fetchLikeData();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, [fetchLikeData]);

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={handleToggleLike}
    >
      {liked ? "❤️" : "🤍"} <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;