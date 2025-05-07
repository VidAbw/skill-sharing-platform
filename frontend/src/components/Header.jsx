import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSearch } from "react-icons/fi";
import axios from "../api/axiosInstance";

let debounceTimer;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch suggestions with debounce
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const res = await axios.get(`/profiles/search/${searchQuery}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error("Search failed", err);
        setSuggestions([]);
      }
    }, 300); // 300ms debounce
  }, [searchQuery]);

  const handleSelectProfile = (userId) => {
    setSearchQuery("");
    setSuggestions([]);
    navigate(`/profile/${userId}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="ExploreHub Logo" className={styles.mainLogo} />
      </div>

      <div className={styles.center}>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Dropdown Suggestions */}
          {suggestions.length > 0 && (
            <div className={styles.dropdown}>
              {suggestions.map((user) => (
                <div
                  key={user.userId}
                  className={styles.dropdownItem}
                  onClick={() => handleSelectProfile(user.userId)}
                >
                  <img
                    src={
                      user.profileImageUrl
                        ? `http://localhost:8080${user.profileImageUrl}`
                        : "/default-profile.png"
                    }
                    alt="Profile"
                    className={styles.avatar}
                  />
                  <span>{user.fullName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <FiHome onClick={() => navigate("/")} title="Home" />
        <FiUser onClick={() => navigate("/profile")} title="Profile" />
      </div>
    </header>
  );
};

export default Header;
