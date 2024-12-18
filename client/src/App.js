import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="App">
      <EmployeeForm onEmployeeAdded={handleReload} />
      <EmployeeList reload={reload} />
    </div>
  );
}

export default App;
