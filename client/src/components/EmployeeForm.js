import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    date_of_joining: '',
    role: ''
  });

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Sales', 'Operations'];

  const validateForm = () => {
    if (!formData.employee_id) {
      alert('Employee ID is required');
      return false;
    }

    if (formData.employee_id.length > 10 || /[^a-zA-Z0-9]/.test(formData.employee_id)) {
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
    const joiningDate = new Date(formData.date_of_joining);
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

    // Convert form data to match server expectations
    const serverData = {
      employee_id: formData.employee_id.toString(),  // Ensure it's a string
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role,
      date_of_joining: new Date(formData.date_of_joining).toISOString().split('T')[0]  // Format date as YYYY-MM-DD
    };

    console.log('Sending data to server:', serverData);

    try {
      const response = await axios({
        method: 'post',
        url: 'https://employeemanagement-ob6j.onrender.com/api/employees',
        data: serverData,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Server response:', response.data);
      alert('Employee registered successfully!');
      handleReset();
      navigate('/employees');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      
      if (error.response?.data?.error) {
        alert('Error: ' + error.response.data.error);
      } else {
        alert('Error registering employee. Please check the console for details.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      employee_id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      department: '',
      date_of_joining: '',
      role: ''
    });
  };

  return (
    <div className="employee-form">
      <h2>Employee Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            maxLength="10"
            placeholder="Enter employee ID (alphanumeric)"
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Enter last name"
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
            placeholder="Enter email"
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
            placeholder="Enter 10-digit phone number"
      
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
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
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
            placeholder="Enter role"
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="button" onClick={() => navigate('/employees')} className="secondary-button">
            Employee Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
