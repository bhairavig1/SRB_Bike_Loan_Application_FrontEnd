import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function UpdateEnquiry() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { id } = useParams();

  const getSingleEnquiry = () => {
    axios
      .get(`http://localhost:1000/customer/getby/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          for (let prop in data) {
            setValue(prop, data[prop]);
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(getSingleEnquiry, []);

  const onSubmit = (data) => {
    axios.put(`http://localhost:1000/customer/update/${id}`, data)
      .then((res) => {
        alert('Data Updated Successfully!');
        reset();
      })
      .catch((err) => {
        console.error(err);
        alert('Update failed!');
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Update Enquiry</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input {...register('firstName')} className="form-control" placeholder="First Name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input {...register('lastName')} className="form-control" placeholder="Last Name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" {...register('age')} className="form-control" placeholder="Age" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" {...register('email')} className="form-control" placeholder="Email" />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile No</label>
              <input {...register('mobileno')} className="form-control" placeholder="Mobile No" />
            </div>

            <div className="mb-3">
              <label className="form-label">PAN Card No</label>
              <input {...register('pancardno')} className="form-control" placeholder="PAN Card No" />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input {...register('address')} className="form-control" placeholder="Address" />
            </div>

            <div className="mb-3">
              <label className="form-label">Alternate Mobile No</label>
              <input {...register('altmobileno')} className="form-control" placeholder="Alternate Mobile No" />
            </div>

            <div className="mb-3">
              <label className="form-label">Aadhar Card No</label>
              <input {...register('adharcard')} className="form-control" placeholder="Aadhar Card No" />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEnquiry;
