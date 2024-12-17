import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <EmployeeForm />
      <EmployeeList /> 
    </div>
  );
}

export default App;
