# MERN Stack CRUD Application

## Overview
This is a simple MERN (MongoDB, Express.js, React, Node.js) stack application that performs Create, Read, Update, and Delete (CRUD) operations. The application allows users to manage employee records with form validation implemented on the frontend.

## Features
- Create a new employee
- Read and display a list of employees
- Update employee details
- Delete an employee record
- Form validation for required fields and email format validation

## Installation and Setup

### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

## Validation Approach

The frontend implements form validation using React state and event handlers. Validation is performed before submitting the form to ensure all fields are filled in correctly.

### Validation Rules:
- All fields are required.
- The email field must be in a valid format (e.g., `user@example.com`).

### Example Error Messages:
- "Name is required."
- "Email is required."
- "Invalid email format. Please enter a valid email address."

### Example Validation Code (React Frontend):
```jsx
const [formData, setFormData] = useState({ name: "", email: "" });
const [errors, setErrors] = useState({});

const validateForm = () => {
  let newErrors = {};
  if (!formData.name.trim()) newErrors.name = "Name is required.";
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    newErrors.email = "Invalid email format. Please enter a valid email address.";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Proceed with form submission
  }
};
```

## API Endpoints

### Backend Routes:
#### Employee Routes:
- `POST /api/employees` - Add a new employee
- `GET /api/employees` - Get all employees
- `PUT /api/employees/:id` - Update an employee
- `DELETE /api/employees/:id` - Delete an employee

## Technologies Used
- **Frontend**: React, React Router, Axios, Tailwind CSS (optional)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Conclusion
This MERN stack application provides a simple way to manage employees with CRUD operations and frontend validation. The validation ensures data integrity before submitting to the backend, enhancing user experience and data accuracy.

