import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: ''
  });

  const [reloadList, setReloadList] = useState(false); 

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Sales', 'Operations'];

  const validateForm = () => {
    // First check employee ID
    if (!formData.employeeId ) {
      alert('Employee ID is required');
      return false;
    }

    if (formData.employeeId.length > 10 || /[^a-zA-Z0-9]/.test(formData.employeeId)) {
      alert('Employee ID must be alphanumeric and max 10 characters');
      return false;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      return false;
    }

    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert('Phone number must be 10 digits');
      return false;
    }

    const today = new Date();
    const joiningDate = new Date(formData.dateOfJoining);
    if (joiningDate > today) {
      alert('Joining date cannot be in the future');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Sending data to server:', formData);

    try {
      const response = await axios.post(
        'https://employeemanagement-ob6j.onrender.com/api/employees',
        formData,
        
      );
      
      console.log('Server response:', response.data);
      alert('Employee registered successfully!');
      handleReset();
      navigate('/employees');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Error registering employee: ' + error.message);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      department: '',
      dateOfJoining: '',
      role: ''
    });
  };

  return (
    <div className="employee-form">
      <h2>Employee Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            max={new Date().toISOString().split('T')[0]}
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={() => navigate('/employees')} className="secondary-button">
            Employee Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
