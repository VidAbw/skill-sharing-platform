import React, { useState } from 'react';
import axios from 'axios';

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: []
  });

  const [mediaPreviewUrls, setMediaPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload up to 3 files only.");
      return;
    }

    const previewUrls = files.map(file => URL.createObjectURL(file));

    setFormData(prev => ({ ...prev, media: files }));
    setMediaPreviewUrls(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);

      const photos = formData.media.filter(file => file.type.startsWith('image/'));
      const video = formData.media.find(file => file.type.startsWith('video/'));

      if (photos.length > 0) {
        photos.forEach(photo => {
          data.append('photos', photo);
        });
      }

      if (video) {
        data.append('video', video);
      }

      const response = await axios.post('http://localhost:8000/api/posts/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Post uploaded successfully!');
      console.log('Server Response:', response.data);

      setFormData({
        title: '',
        description: '',
        media: []
      });
      setMediaPreviewUrls([]);

    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Failed to upload post.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-primary">Create a New Travel Skill Post</h3>
              <p className="text-muted mb-4">
                Share a unique travel skill, a memorable moment, or helpful tips from your journey.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Post Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Surfing in Bali"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us what you learned, taught, or experienced..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Upload Images or Short Videos (Max 3 files)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <small className="form-text text-muted">
                    Max 3 files. Videos must be under 30 seconds.
                  </small>

                  {mediaPreviewUrls.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-3">
                      {mediaPreviewUrls.map((url, idx) => {
                        const file = formData.media[idx];
                        if (!file) return null;

                        const isVideo = file.type.startsWith('video/');
                        return isVideo ? (
                          <video key={idx} src={url} controls width="120" height="120" style={{ borderRadius: '10px', objectFit: 'cover' }} />
                        ) : (
                          <img key={idx} src={url} alt="preview" width="120" height="120" style={{ borderRadius: '10px', objectFit: 'cover' }} />
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit Post
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

export default CreatePostPage;
