import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="container-fluid home-background min-vh-100 py-4">
      <div className="row">

        {/* Left Sidebar */}
        <div className="col-md-2 d-none d-md-block">
          <div className="sidebar-card">
            <h5 className="fw-bold mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="sidebar-link">Home</Link></li>
              <li><Link to="/saved" className="sidebar-link">Saved</Link></li>
              <li><Link to="/videos" className="sidebar-link">Videos</Link></li>
            </ul>
          </div>
        </div>

        {/* Center Content */}
        <div className="col-md-7">
          <div className="main-card mb-4">
            <h5 className="fw-bold mb-2">Create a Story</h5>
            <button className="btn btn-primary w-100">+ Add Story</button>
          </div>

          <div className="main-card mb-4">
            <h5 className="fw-bold mb-3">What's on your mind?</h5>
            <div className="d-flex gap-2 mb-3">
              <Link to="/post/new" className="btn btn-primary flex-grow-1">Create Post</Link>
              <Link to="/itinerary/new" className="btn btn-outline-primary flex-grow-1">New Itinerary</Link>
            </div>
          </div>

          {/* Posts Feed Grid */}
          <div className="row g-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="col-md-6">
                  <div className="post-card">

                    {/* Media */}
                    {post.photoPaths?.length > 0 && (
                      <div id={`carousel-${post.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
                        <div className="carousel-inner rounded">
                          {post.photoPaths.map((photo, idx) => (
                            <div className={`${idx === 0 ? 'active' : ''} carousel-item`} key={idx}>
                              <img
                                src={`http://localhost:8000${photo}`} 
                                className="d-block w-100"
                                alt={`photo-${idx}`}
                                style={{ objectFit: 'cover', height: '300px', borderRadius: '10px' }}
                              />
                            </div>
                          ))}
                        </div>
                        {post.photoPaths.length > 1 && (
                          <>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${post.id}`} data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${post.id}`} data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    {post.videoPath && (
                      <video
                        src={`http://localhost:8000${post.videoPath}`}
                        controls
                        className="w-100 rounded mb-3"
                        style={{ objectFit: 'cover', height: '300px' }}
                      />
                    )}

                    {/* Content */}
                    <h5 className="fw-bold text-center">{post.title}</h5>
                    <p className="text-muted text-center">{post.location} {post.cost}</p>
                    <p className="text-center">{post.description}</p>

                    {/* Actions */}
                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/post/edit/${post.id}`} className="btn btn-outline-primary flex-grow-1">
                        Update
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="btn btn-outline-danger flex-grow-1">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No posts yet.</p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-md-3 d-none d-md-block">
          <div className="sidebar-card">
            <h5 className="fw-bold mb-3">Online Friends</h5>
            <ul className="list-unstyled">
              <li className="online-friend">John Doe</li>
              <li className="online-friend">Jane Smith</li>
              <li className="online-friend">Chris Brown</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
