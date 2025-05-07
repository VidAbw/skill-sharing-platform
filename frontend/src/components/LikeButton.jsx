import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import "../styles/LikeButton.css"; // ✅ Import new CSS

const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchLikeData = async () => {
    const countRes = await axios.get(`/likes/count/${postId}`);
    setLikeCount(countRes.data);

    const checkRes = await axios
      .get(`/likes/post/${postId}/user/${userId}`)
      .catch(() => null);

    if (checkRes?.data?.id) setLiked(true);
  };

  const handleToggleLike = async () => {
    if (liked) {
      await axios.delete(`/likes`, { data: { userId, postId } });
    } else {
      await axios.post(`/likes`, { userId, postId });
    }

    setLiked(!liked);
    fetchLikeData();
  };

  useEffect(() => {
    fetchLikeData();
  }, [postId, userId]);

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