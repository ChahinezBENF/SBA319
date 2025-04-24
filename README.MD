# Employee Management System

This is a simple Node.js/Express web application for managing employees, departments, and roles. It uses **MongoDB** as the database and **Mongoose** for data modeling, along with **EJS** as the templating engine. The application allows users to perform CRUD operations on employees, roles, and departments.

---
## 🌟 Features

- **CRUD Operations**:  
  Add, view, update, and delete employees, roles, and departments.
- **Search Functionality**:  
  Search employees by first name, last name, role, or department.
- **Dynamic Views**:  
  Render dynamic EJS templates for user-friendly interaction.
- **Data Relationships**:  
  Employees are linked to roles and departments using MongoDB references.
- **Validation**:  
  Mongoose schemas enforce data integrity and consistency.
- **Responsive Design**:  
  Styled with custom CSS for better user experience.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)

### Frontend
- EJS templating
- HTML/CSS

### Dependencies
- `dotenv` for environment variables
- `method-override` for PUT and DELETE requests

### Database
- MongoDB Atlas 

---
## 📂 API Endpoints

### Employees
- **`GET /employees/view`** - View all employees.
- **`POST /employees`** - Add a new employee.
- **`GET /employees/update/:id`** - View employee update form.
- **`POST /employees/update/:id`** - Update an employee's details.
- **`DELETE /employees/:id`** - Delete an employee.

### Departments
- **`GET /departments/view`** - View all departments.
- **`POST /departments`** - Add a new department.
- **`PUT /departments/:id`** - Update a department.
- **`DELETE /departments/:id`** - Delete a department.

### Roles
- **`GET /roles/view`** - View all roles.
- **`POST /roles`** - Add a new role.
- **`PUT /roles/:id`** - Update a role.
- **`DELETE /roles/:id`** - Delete a role.

---

## ✅ Requirement Fulfillment

## 1. Use at least three different data collections within the database
My project utilizes the following three collections:
- **Employees** (`employeeModel`)
- **Roles** (`roleModel`)
- **Departments** (`departmentModel`)

These collections are distinct and interrelated via references, ensuring a relational data structure.

---

## 2. Utilize reasonable data modeling practices
I have implemented Mongoose schemas that:
- Enforce data structure through validation.
- Establish relationships between collections using references.

#### Example:
```javascript
role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
```
---

## 3. Create GET routes for all data that should be exposed to the client
I have GET routes for retrieving data from `routes/employee.js` fil : 

- **/employees/view** Fetches all employees with populated roles and departments.

- **/employees/:id** Fetches a single employee by ID.

- **/employees/search** Implements a search functionality.

These routes effectively use Mongoose queries such as .find() and .populate() to retrieve and format data for clients.
same thing for the fils (`routes/departments.js` , `routes/roles.js`)

---

## 4. Create POST routes for data
I have a POST route for adding data (`employee`, `department`, `role`)

#### Example:
The `routes/employees` allows clients to create a new employee 

```javascript
router.post('/', async (req, res) => {
  const { .............. } = req.body;
  try {  const newEmployee = new Employee({.......... });
    await newEmployee.save();
    res.redirect('/employees/view');
  } catch (err) {  res.status(400).send(err.message);  } });
```

## 5.Create PATCH or PUT routes for data
I have a  PUT route for updating employee data (`employee`)

#### Example:
The routes/employees file contains the following endpoint to update an employee's details: 

```javascript
// Update an employee using PUT
router.put('/:id', async (req, res) => {
  const { ........... } = req.body;
  try { 
    const updatedEmployee = await Employee.findByIdAndUpdate( ............... );
      } catch (err) {
    res.status(400).json({ error: err.message });
  }});
```

## 6.Create DELETE routes for data
I have DELETE functionality in fils (`employee`, `department`, `role`)  

#### Example:
The `routes/employees` allows Deletes an employee

```javascript
router.delete('/:id', async (req, res) => {
  try { const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      } catch (err) { res.status(500).send(err.message);  }});
```
## 7. Include Sensible Indexes for Frequently Queried Fields
Indexes are applied thoughtfully in schemas : 
- **Employee Schema :**
    - Eid : Unique and indexed for quick employee lookups
    - role , departmenet : Indexed for efficient querying of relationships
- **Role Schema :** 
    - Rid : Unique and indexed for rapid role lookups
    - title : Indexed for efficient searches by role titles
- **Department :**
    - Did : Unique and indexed for fast department lookups
    - name : Indexed for efficient department name-based queries

#### Example:
```javascript
Eid: { type: Number, required: true, unique: true, index: true } // Unique and indexed for quick lookups
role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true, index: true } // Indexed for relationship queries
department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, index: true } // Indexed for relationship queries
```
## 8. Include sensible MongoDB data validation rules for at least one data collection
- **Employee Model Validation :**  

```javascript
Eid: {type: Number,required: true, unique : true , index: true, validate: {
    validator: (value) => value > 0, // Ensure `Eid` is positive
    message: 'Eid must be a positive number.'  } },
.........
 salary: { type: Number, required: true,
    min: [30000, 'Salary must be at least $30,000.'], // Enforce minimum salary
    max: [200000, 'Salary cannot exceed $200,000.'] // Enforce maximum salary
  },
```

- **Confirming Validation via API Routes :**  The POST route in `routes/employees.js`

```javascript
router.post('/update/:id', async (req, res) => {
  const { firstName, lastName, role, department, salary, hireDate ,dob} = req.body;
  try {  const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, role, department, salary, hireDate, dob },
      { new: true, runValidators: true });
      .........}
```

- **Testing Validation in Postman :** put Invalid Data Example in body 

```javascript
{
  "Eid": -5,
  "firstName": "Chahinez",
  "lastName": "Benfriha",
  "role": "643f1f32fc13ae5a4d000004",   
  "department": "643f1f32fc13ae5a4d000005", 
  "salary": 25000,
  "hireDate": "invalid-date",
  "dob": "2025-01-01"
}
```
- **Expected Response :** 
```javascript
 {
  Validation failed: salary: Salary must be at least $30,000., Eid: Eid must be a positive number.
}
```
## 9. Populate Collections with Sample Data
The database is populated with sample data using the `seedData.js` script. Each collection has more than 10 documents to meet and exceed the requirements.
The `routes/employees.js` file handles routing logic, while `seedData.js` is responsible for database seeding. Keeping them separate to ensures modularity and clarity

#### Example:
The `seedData.js` allows seeding employees, roles and departments 
```javascript
{ "Did": 1, "name": "Engineering" }
{ "Did": 2, "name": "Human Resources" }
.......
{ "Rid": 1, "title": "Engineer" }
{ "Rid": 2, "title": "Manager" }
......
{ "Eid": 101, "firstName": "Alice", "lastName": "Johnson", "role": "Engineer", "department": "Engineering" }
{ "Eid": 102, "firstName": "Bob", "lastName": "Smith", "role": "Manager", "department": "Human Resources" }

```



## 10.Utilize reasonable code organization practices 
my project demonstrates reasonable code organization by adhering to the following best practices:
- **the codebase is organized into dedicated directories for different functionalities:** 
    -  models: Contains Mongoose schemas for data modeling.
    -  routes: Contains route handlers for each resource (employees, roles, departments).
    - views: Contains EJS templates for rendering the user interface.
    - db: Contains the database connection logic.
- **Each feature is encapsulated in its own module**
    - employeeModel.js for the Employee model, employees.js for employee-related routes
    - departmentModel.js for the Department model, departments.js for department-related routes
    - roleModel.js for the Role model, roles.js for role-related routes
- **Reusable Components:**
    - Middleware, such as `method-override` and `JSON parsing` logic, is centralized in the `index.js` file.
    - Shared EJS templates 
- **Environment Configuration:** 
    - Sensitive configuration values (e.g., MongoDB URI, PORT) are stored in a `.env ` file, added in `.gitignore` file keeping them secure and easily configurable.


## 11.Ensure that the program runs without errors 
   - No Runtime Errors, Handle Failures Gracefully, Error Handling

#### Example:
Error Handling in `routes/employees.js`

```javascript
router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.redirect('/employees/view');
  } catch (err) {
    res.status(400).send(err.message); // handling errors
  }});
```
Handling Database Errors in `conn.js`

```javascript
mongoose
  .connect(process.env.ATLAS_URI, { dbName: 'SBA319', })
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch((error) => console.error('MongoDB connection error:', error));
```

## 12. Commit frequently to the git repository 
- Git Commit Practices Project includes frequent commit (over 10)

## 13. Include a README file that contains a description of my application  ✅

## 15. Creativity and User Experience ✅

## 16. Use Mongoose for Application Implementation 
 The application relies on Mongoose for:
  - **Models:** `employeeModel`, `roleModel`, `departmentModel` define schema-level validations.
  - **Database Queries:** CRUD operations are implemented using `.find()`, `.save()`, `.findByIdAndUpdate()`, and `.findByIdAndDelete()`.