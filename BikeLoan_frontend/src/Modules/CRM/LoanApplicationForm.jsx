import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LoanApplicationForm() {
  const { register, handleSubmit, getValues, setValue, trigger } = useForm();
  const [step, setStep] = useState(1);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSameAsPermanent = (e) => {
    const checked = e.target.checked;
    setSameAsPermanent(checked);
    if (checked) {
      const permanent = getValues('customerAddress.permanentAddress');
      for (const key in permanent) {
        setValue(`customerAddress.localAddress.${key}`, permanent[key]);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      const files = {
        addressProof: data.addressProof[0],
        panCard: data.panCard[0],
        incomeTax: data.incomeTax[0],
        addharCard: data.addharCard[0],
        photo: data.photo[0],
        signature: data.signature[0],
        bankCheque: data.bankCheque[0],
        salarySlips: data.salarySlips[0],
      };

      delete data.addressProof;
      delete data.panCard;
      delete data.incomeTax;
      delete data.addharCard;
      delete data.photo;
      delete data.signature;
      delete data.bankCheque;
      delete data.salarySlips;

      formData.append('json', JSON.stringify(data));

      for (const [key, file] of Object.entries(files)) {
        if (file) formData.append(key, file);
      }

      const response = await axios.post(
        `http://localhost:1003/loan/addData/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
      setIsSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form!');
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-success">Form already submitted</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Application Form - Step {step}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* === Step 1: Personal Details === */}
        {step === 1 && (
          <>
            <h4>Personal Details</h4>
            <input className="form-control mb-2" type="date" {...register('customerDateOfBirth')} placeholder="DOB" />
            <div className="mb-2">
              Gender:
              <label className="ms-2">
                <input type="radio" value="Male" {...register('customerGender')} /> Male
              </label>
              <label className="ms-2">
                <input type="radio" value="Female" {...register('customerGender')} /> Female
              </label>
              <label className="ms-2">
                <input type="radio" value="Other" {...register('customerGender')} /> Other
              </label>
            </div>
            <input className="form-control mb-2" type="number" {...register('customerAmountPaidForBike')} placeholder="Amount Paid for Bike" />
            <input className="form-control mb-2" type="number" {...register('customerTotalLoanRequired')} placeholder="Total Loan Required" />
            <select className="form-select mb-2" {...register('loanStatus')}>
              <option value="">Select Loan Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </>
        )}

        {/* === Step 2: Family Dependent Info === */}
        {step === 2 && (
          <>
            <h4>Family Dependent Info</h4>
            <input className="form-control mb-2" type="number" {...register('familyDependentInfo.noOfFamilyMember')} placeholder="No. of Family Members" />
            <input className="form-control mb-2" type="number" {...register('familyDependentInfo.noOfChild')} placeholder="No. of Children" />
            <select className="form-select mb-2" {...register('familyDependentInfo.maritalStatus')}>
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
            </select>
            <input className="form-control mb-2" {...register('familyDependentInfo.dependentMember')} placeholder="Dependent Member" />
            <input className="form-control mb-2" type="number" {...register('familyDependentInfo.familyIncome')} placeholder="Family Income" />
          </>
        )}

        {/* === Step 3: Permanent Address === */}
        {step === 3 && (
          <>
            <h4>Permanent Address</h4>
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.areaName')} placeholder="Area Name" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.cityName')} placeholder="City Name" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.district')} placeholder="District" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.state')} placeholder="State" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.pinCode')} placeholder="Pin Code" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.houseNumber')} placeholder="House Number" />
            <input className="form-control mb-2" {...register('customerAddress.permanentAddress.streetName')} placeholder="Street Name" />
          </>
        )}

        {/* === Step 4: Local Address === */}
        {step === 4 && (
          <>
            <h4>Local Address</h4>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" checked={sameAsPermanent} onChange={handleSameAsPermanent} id="sameAsPermanent" />
              <label className="form-check-label" htmlFor="sameAsPermanent">
                Same as Permanent
              </label>
            </div>
            <input className="form-control mb-2" {...register('customerAddress.localAddress.areaName')} placeholder="Area Name" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.cityName')} placeholder="City Name" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.district')} placeholder="District" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.state')} placeholder="State" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.pinCode')} placeholder="Pin Code" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.houseNumber')} placeholder="House Number" />
            <input className="form-control mb-2" {...register('customerAddress.localAddress.streetName')} placeholder="Street Name" />
          </>
        )}

        {/* === Step 5: Account Details === */}
        {step === 5 && (
          <>
            <h4>Account Details</h4>
            <select className="form-select mb-2" {...register('accountDetails.accountType')}>
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
              <option value="Salary">Salary</option>
            </select>
            <input className="form-control mb-2" type="number" {...register('accountDetails.accountBalance')} placeholder="Account Balance" />
            <input className="form-control mb-2" {...register('accountDetails.accountHolderName')} placeholder="Account Holder Name" />
            <select className="form-select mb-2" {...register('accountDetails.accountStatus')}>
              <option value="">Select Account Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Closed">Closed</option>
            </select>
            <input className="form-control mb-2" {...register('accountDetails.accountNumber')} placeholder="Account Number" />
            <input className="form-control mb-2" {...register('accountDetails.bankName')} placeholder="Bank Name" />
            <input className="form-control mb-2" {...register('accountDetails.ifscCode')} placeholder="IFSC Code" />
          </>
        )}

        {/* === Step 6: Upload Documents === */}
        {step === 6 && (
          <>
            <h4>Upload Documents</h4>
            <label className="form-label">Address Proof</label>
            <input className="form-control mb-2" type="file" {...register('addressProof')} />
            <label className="form-label">PAN Card</label>
            <input className="form-control mb-2" type="file" {...register('panCard')} />
            <label className="form-label">Income Tax</label>
            <input className="form-control mb-2" type="file" {...register('incomeTax')} />
            <label className="form-label">Aadhar Card</label>
            <input className="form-control mb-2" type="file" {...register('addharCard')} />
            <label className="form-label">Photo</label>
            <input className="form-control mb-2" type="file" {...register('photo')} />
            <label className="form-label">Signature</label>
            <input className="form-control mb-2" type="file" {...register('signature')} />
            <label className="form-label">Bank Cheque</label>
            <input className="form-control mb-2" type="file" {...register('bankCheque')} />
            <label className="form-label">Salary Slips</label>
            <input className="form-control mb-2" type="file" {...register('salarySlips')} />
          </>
        )}

        {/* === Navigation Buttons === */}
        <div className="d-flex justify-content-between mt-3">
          {step > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < 6 && (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          )}
          {step === 6 && (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoanApplicationForm;
