import React, { useState } from 'react';

function CreateItineraryPage() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.destination) newErrors.destination = 'Destination is required.';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required.';
    if (!formData.endDate) newErrors.endDate = 'End Date is required.';
    if (!formData.activities) newErrors.activities = 'Activities are required.';
    if (!formData.notes) newErrors.notes = 'Notes are required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Itinerary Created:', formData);
      // Submit logic goes here (API call etc.)
      setFormData({ destination: '', startDate: '', endDate: '', activities: '', notes: '' });
      setErrors({});
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-primary">Create a Travel Itinerary</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    className={`form-control ${errors.destination ? 'is-invalid' : ''}`}
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Paris, France"
                  />
                  {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                  {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Activities</label>
                  <textarea
                    className={`form-control ${errors.activities ? 'is-invalid' : ''}`}
                    name="activities"
                    rows="3"
                    value={formData.activities}
                    onChange={handleChange}
                    placeholder="List the activities you plan to do..."
                  />
                  {errors.activities && <div className="invalid-feedback">{errors.activities}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label">Notes</label>
                  <textarea
                    className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                    name="notes"
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes..."
                  />
                  {errors.notes && <div className="invalid-feedback">{errors.notes}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Create Itinerary</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateItineraryPage;
