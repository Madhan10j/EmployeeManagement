import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<EmployeeForm />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
