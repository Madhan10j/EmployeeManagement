const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection(`mysql://root:NvkeLxBeFutaajCJUkNSjhLqYyjFVPkz@junction.proxy.rlwy.net:49769/railway`);


db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Employee Registration Route
app.post('/api/employees', async (req, res) => {
  const { 
    firstName, 
    lastName, 
    employeeId, 
    email, 
    phone, 
    department, 
    dateOfJoining, 
    role 
  } = req.body;

  // Validate email format
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate phone number
  if (phone.length !== 10 || isNaN(phone)) {
    return res.status(400).json({ error: 'Phone number must be 10 digits' });
  }

  // Check for duplicate employee ID and email
  const checkQuery = 'SELECT * FROM employees WHERE employee_id = ? OR email = ?';
  
  try {
    const [existing] = await db.promise().query(checkQuery, [employeeId, email]);
    
    if (existing.length > 0) {
      const isDuplicateId = existing.some(emp => emp.employee_id === employeeId);
      const isDuplicateEmail = existing.some(emp => emp.email === email);
      
      if (isDuplicateId) {
        return res.status(400).json({ error: 'Employee ID already exists' });
      }
      if (isDuplicateEmail) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }

    // Insert employee data into the database
    const insertQuery = `INSERT INTO employees 
      (employee_id, first_name, last_name, email, phone, department, date_of_joining, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.promise().query(insertQuery, [
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      department,
      dateOfJoining,
      role
    ]);

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.error('Error registering employee:', error.message);
    res.status(500).json({ error: 'Error registering employee' });
  }
});

// Fetch all employees route
app.get('/api/employees', async (req, res) => {
  try {
    const [employees] = await db.promise().query('SELECT * FROM employees');
    
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// Fetch employee by ID route
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [employee] = await db.promise().query('SELECT * FROM employees WHERE employee_id = ?', [id]);

    if (employee.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee[0]);
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
