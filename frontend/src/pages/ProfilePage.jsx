import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import UserProfile from "../components/UserProfile";
import FollowButton from "../components/FollowButton";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const viewedUserId = id ? Number(id) : user?.id;
  const isOwnProfile = Number(viewedUserId) === Number(user?.id);

  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editData, setEditData] = useState({ fullName: "", bio: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch profile + follow stats
  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true); // Reset loading on profile switch
      try {
        const res = await axios.get(`/profiles/${viewedUserId}`);
        setProfile(res.data);

        const [resFollowers, resFollowing] = await Promise.all([
          axios.get(`/follows/followers/${viewedUserId}`),
          axios.get(`/follows/following/${viewedUserId}`),
        ]);

        setFollowers(resFollowers.data);
        setFollowing(resFollowing.data);
      } catch (err) {
        console.error("❌ Failed to load profile data", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (viewedUserId) {
      loadProfileData();
    }
  }, [viewedUserId]);

  // Handle Edit Profile Save
  const handleEditProfile = async () => {
    if (!editData.fullName.trim()) {
      alert("Full Name cannot be empty!");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("fullName", editData.fullName);
      formData.append("bio", editData.bio);
      if (selectedFile) formData.append("profileImage", selectedFile);

      await axios.put(`/profiles/${profile.userId}`, formData);

      alert("✅ Profile updated!");
      setShowEditModal(false);

      const res = await axios.get(`/profiles/${profile.userId}`);
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Update failed", err.response?.data || err.message);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profile) return <div className="error">Profile not found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={
            profile.profileImageUrl
              ? `http://localhost:8080${profile.profileImageUrl}`
              : "/default-profile.png"
          }
          alt=""
          className="profile-picture"
          onError={(e) => (e.target.src = "/default-profile.png")}
        />

        <div className="profile-details">
          <h2>{profile.fullName}</h2>
          <p>
            <strong>Bio:</strong> {profile.bio || "No bio available."}
          </p>
          <p>
            <strong>Followers:</strong> {followers.length} |{" "}
            <strong>Following:</strong> {following.length}
          </p>

          {!isOwnProfile && (
            <FollowButton
              currentUserId={user.id}
              targetUserId={profile.userId}
              onFollowChange={async () => {
                try {
                  const res = await axios.get(
                    `/follows/followers/${profile.userId}`
                  );
                  setFollowers(res.data);
                } catch (err) {
                  console.error("Failed to refresh followers");
                }
              }}
            />
          )}

          {isOwnProfile && (
            <div className="profile-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditData({ fullName: profile.fullName, bio: profile.bio });
                  setSelectedFile(null);
                  setShowEditModal(true);
                }}
              >
                Edit Profile
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="user-posts-section">
        <UserProfile userName={profile.fullName} currentUserId={user.id} />
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Profile</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={editData.fullName}
              onChange={(e) =>
                setEditData({ ...editData, fullName: e.target.value })
              }
            />
            <textarea
              placeholder="Bio"
              value={editData.bio}
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button onClick={handleEditProfile} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
