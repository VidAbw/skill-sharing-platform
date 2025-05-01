import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 0) {
        try {
          const res = await axios.get(`/profiles/search/${query}`);
          setResults(res.data);
        } catch (err) {
          console.error("Search error:", err);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // debounce to avoid too many requests
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="search-page">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />

      <div className="search-results-container">
        {query && (
          <>
            <h3>Search Results for "{query}"</h3>
            {results.length > 0 ? (
              <div className="results-grid">
                {results.map((user) => (
                  <div
                    key={user.userId}
                    className="user-card"
                    onClick={() => handleProfileClick(user.userId)}
                  >
                    <img
                      src={user.profileImageUrl || "/default-profile.png"}
                      alt="Profile"
                    />
                    <div>
                      <h4>{user.fullName}</h4>
                      <p>{user.bio || "No bio available."}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
