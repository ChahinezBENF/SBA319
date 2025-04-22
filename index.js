const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./db/conn'); 
const methodOverride = require('method-override');


// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5050; // Use the PORT from environment variables, fallback to 5050
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to support PUT and DELETE from forms
app.use(methodOverride('_method'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Import route modules
const departmentsRoutes = require('./routes/departments');
const employeesRoutes = require('./routes/employees');
const rolesRoutes = require('./routes/roles');

// Set up view engine for rendering views
app.set('view engine', 'ejs'); // Use 'ejs' as the view engine
app.set('views', './views');   

// Root Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Chahinez Managment' }); 
});

// Use route modules for API endpoints
app.use('/departments', departmentsRoutes);
app.use('/employees', employeesRoutes);
app.use('/roles', rolesRoutes);

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
