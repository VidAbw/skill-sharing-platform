// src/pages/EditPostPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: []           // holds File objects
  });
  const [previewUrls, setPreviewUrls] = useState([]); // for showing current + new media

  // Load existing post
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}`)
      .then(({ data }) => {
        setFormData({
          title: data.title,
          description: data.description,
          media: []            // new uploads only
        });
        // build initial preview urls from saved paths:
        const urls = [];
        if (data.photoPaths) data.photoPaths.forEach(p => urls.push(`http://localhost:8000${p}`));
        if (data.videoPath) urls.push(`http://localhost:8000${data.videoPath}`);
        setPreviewUrls(urls);
      })
      .catch(console.error);
  }, [id]);

  // Handle text changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  // Handle new file selection
  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    // optional: limit to 3 files
    if (files.length > 3) {
      alert("Max 3 files");
      return;
    }
    setFormData(f => ({ ...f, media: files }));
    setPreviewUrls(files.map(f => URL.createObjectURL(f)));
  };

  // Submit updated data
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);

      // split photos and video
      const photos = formData.media.filter(f => f.type.startsWith('image/'));
      const video  = formData.media.find(f => f.type.startsWith('video/'));

      photos.forEach(photo => data.append('photos', photo));
      if (video) data.append('video', video);

      await axios.put(
        `http://localhost:8000/api/posts/${id}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Post updated successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-primary">Edit Post</h3>
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Post Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Media */}
                <div className="mb-4">
                  <label className="form-label">Replace Images/Videos (Max 3 files)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <small className="form-text text-muted">
                    Leave empty to keep existing media.
                  </small>

                  {previewUrls.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-3 preview-media">
                      {previewUrls.map((url, idx) => {
                        const file = formData.media[idx];
                        const isVideo = file ? file.type.startsWith('video/') : url.endsWith('.mp4');
                        return isVideo ? (
                          <video
                            key={idx}
                            src={url}
                            controls
                            className="rounded"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            key={idx}
                            src={url}
                            alt="preview"
                            className="rounded"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
