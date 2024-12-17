import React, { useState } from 'react';
import EmployeeList from './EmployeeList';

function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([...employees, formData]);
    setFormData({ name: '', position: '', department: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
        <button type="submit">Add Employee</button>
      </form>
      <EmployeeList employees={employees} />
    </div>
  );
}

export default EmployeeForm;
