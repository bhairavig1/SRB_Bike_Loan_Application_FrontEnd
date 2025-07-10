import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddEnquiry() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:1000/customer/add', data);
      alert('Enquiry submitted successfully!');
      console.log(response.data);
      reset(); // Clear the form
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please check the form and try again.');
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add Customer Enquiry</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                {...register('firstName')}
                className="form-control"
                placeholder="Enter First Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                {...register('lastName')}
                className="form-control"
                placeholder="Enter Last Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                {...register('age')}
                className="form-control"
                placeholder="Enter Age"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('email')}
                className="form-control"
                placeholder="Enter Email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile No</label>
              <input
                {...register('mobileno')}
                className="form-control"
                placeholder="Enter Mobile Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">PAN Card No</label>
              <input
                {...register('pancardno')}
                className="form-control"
                placeholder="Enter PAN Card Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                {...register('address')}
                className="form-control"
                placeholder="Enter Address"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Alternate Mobile No</label>
              <input
                {...register('altmobileno')}
                className="form-control"
                placeholder="Enter Alternate Mobile Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Aadhar Card No</label>
              <input
                {...register('adharcard')}
                className="form-control"
                placeholder="Enter Aadhar Card Number"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEnquiry;
