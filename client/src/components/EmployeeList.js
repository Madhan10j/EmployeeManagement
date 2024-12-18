import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {<div className="header">
        <h2>Employee List</h2>
        <button onClick={() => navigate('/form')} className="add-button">
          Add Employee
        </button>
      </div>
        const response = await axios.get('https://employeemanagement-ob6j.onrender.com/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="employee-list"><p>Loading employeSs...</p></div>;
  }

  return (
    <div className="employee-list">
      <div className="header">
        <h2>Employee List</h2>
        <button onClick={() => navigate('/form')} className="add-button">
          Add Employee
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No employees found</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
