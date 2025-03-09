import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    company: '',
    city: '',
    email: ''
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    departmentError: '',
    companyError: '',
    cityError: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const validateForm = () => {
    if (selectedEmployee) return true; // Skip validation if editing employee

    let valid = true;
    const newErrors = {
      nameError: '',
      emailError: '',
      departmentError: '',
      companyError: '',
      cityError: ''
    };

    if (!newEmployee.name) {
      newErrors.nameError = 'Name is required';
      valid = false;
    }
    if (!newEmployee.email) {
      newErrors.emailError = 'Email is required';
      valid = false;
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(newEmployee.email)) {
      newErrors.emailError = 'Invalid email format';
      valid = false;
    }
    if (!newEmployee.department) {
      newErrors.departmentError = 'Department is required';
      valid = false;
    }
    if (!newEmployee.company) {
      newErrors.companyError = 'Company is required';
      valid = false;
    }
    if (!newEmployee.city) {
      newErrors.cityError = 'City is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = async () => {
    // Validate form before submitting
    if (!validateForm()) return;

    try {
      if (selectedEmployee) {
        await axios.put(`http://localhost:5000/employees/${selectedEmployee._id}`, selectedEmployee);
        setSelectedEmployee(null); // Clear selected employee after update
      } else {
        await axios.post('http://localhost:5000/employees', newEmployee);
      }
      setNewEmployee({
        name: '',
        department: '',
        company: '',
        city: '',
        email: ''
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error submitting employee:', error);
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios.delete(`http://localhost:5000/employees/${selectedEmployee._id}`);
      setSelectedEmployee(null); // Clear selected employee after delete
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const renderForm = () => {
    const employee = selectedEmployee || newEmployee;
    return (
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Name"
            value={employee.name}
            onChange={e => selectedEmployee ? setSelectedEmployee({ ...selectedEmployee, name: e.target.value }) : setNewEmployee({ ...newEmployee, name: e.target.value })}
            style={styles.input}
          />
          {errors.nameError && !selectedEmployee && <div style={styles.errorText}>{errors.nameError}</div>}

          <input
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={e => selectedEmployee ? setSelectedEmployee({ ...selectedEmployee, email: e.target.value }) : setNewEmployee({ ...newEmployee, email: e.target.value })}
            style={styles.input}
          />
          {errors.emailError && !selectedEmployee && <div style={styles.errorText}>{errors.emailError}</div>}

          <input
            type="text"
            placeholder="Department"
            value={employee.department}
            onChange={e => selectedEmployee ? setSelectedEmployee({ ...selectedEmployee, department: e.target.value }) : setNewEmployee({ ...newEmployee, department: e.target.value })}
            style={styles.input}
          />
          {errors.departmentError && !selectedEmployee && <div style={styles.errorText}>{errors.departmentError}</div>}

          <input
            type="text"
            placeholder="Company"
            value={employee.company}
            onChange={e => selectedEmployee ? setSelectedEmployee({ ...selectedEmployee, company: e.target.value }) : setNewEmployee({ ...newEmployee, company: e.target.value })}
            style={styles.input}
          />
          {errors.companyError && !selectedEmployee && <div style={styles.errorText}>{errors.companyError}</div>}

          <input
            type="text"
            placeholder="City"
            value={employee.city}
            onChange={e => selectedEmployee ? setSelectedEmployee({ ...selectedEmployee, city: e.target.value }) : setNewEmployee({ ...newEmployee, city: e.target.value })}
            style={styles.input}
          />
          {errors.cityError && !selectedEmployee && <div style={styles.errorText}>{errors.cityError}</div>}

          <div style={styles.buttonGroup}>
            <button onClick={handleFormSubmit} style={styles.button}>{selectedEmployee ? 'Update' : 'Add'}</button>
            {selectedEmployee && (
              <button onClick={deleteEmployee} style={styles.deleteButton}>Delete</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee Management</h1>
      
      {/* Render Form */}
      {renderForm()}

      {/* Employee List */}
      <div style={styles.employeeList}>
        <h2 style={styles.listTitle}>Employee List</h2>
        <div style={styles.cardContainer}>
          {employees.map(employee => (
            <div key={employee._id} style={styles.card}>
              <h3 style={styles.cardTitle}>{employee.name}</h3>
              <p style={styles.cardText}>{employee.email}</p>
              <p style={styles.cardText}>{employee.department}</p>
              <p style={styles.cardText}>{employee.company}</p>
              <p style={styles.cardText}>{employee.city}</p>
              <button onClick={() => setSelectedEmployee(employee)} style={styles.editButton}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to right, #f0f4f8, #cce7ff)',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#333',
    fontSize: '36px',
    marginBottom: '30px',
  },
  formContainer: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    width: '80%',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  formTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '26px',
    marginBottom: '20px',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    transition: '0.3s',
  },
  button: {
    background: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px',
    width: '48%',
  },
  deleteButton: {
    background: '#e74c3c',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px',
    width: '48%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  employeeList: {
    width: '80%',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
  },
  listTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '26px',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#555',
    margin: '5px 0',
  },
  editButton: {
    background: '#3498db',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default App;
