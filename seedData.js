const mongoose = require('./db/conn'); 
const Role = require('./models/roleModel');
const Department = require('./models/departmentModel');
const Employee = require('./models/employeeModel');

const seedData = async () => {
  try {
    // Clear existing data
    await Department.deleteMany({});
    await Role.deleteMany({});
    await Employee.deleteMany({});

    // Seed Departments
    const departments = await Department.insertMany([
      { Did: 1, name: 'Engineering' },
      { Did: 2, name: 'Human Resources' },
      { Did: 3, name: 'Finance' },
      { Did: 4, name: 'Marketing' },
      { Did: 5, name: 'Operations' },
      { Did: 6, name: 'Sales' },
      { Did: 7, name: 'IT Support' },
      { Did: 8, name: 'Legal' },
      { Did: 9, name: 'Customer Service' },
      { Did: 10, name: 'R&D' },
    ]);

    // Seed Roles
    const roles = await Role.insertMany([
      { Rid: 1, title: 'Engineer' },
      { Rid: 2, title: 'Manager' },
      { Rid: 3, title: 'Analyst' },
      { Rid: 4, title: 'Recruiter' },
      { Rid: 5, title: 'Technician' },
      { Rid: 6, title: 'Consultant' },
      { Rid: 7, title: 'Specialist' },
      { Rid: 8, title: 'Executive' },
      { Rid: 9, title: 'Administrator' },
      { Rid: 10, title: 'Director' },
    ]);

    // Seed Employees
    const employees = await Employee.insertMany([
      { Eid: 101, firstName: 'Alice', lastName: 'Johnson', role: roles[0]._id, department: departments[0]._id, salary: 80000, hireDate: '2023-04-01', dob: '1990-07-15' },
      { Eid: 102, firstName: 'Bob', lastName: 'Smith', role: roles[1]._id, department: departments[1]._id, salary: 90000, hireDate: '2023-03-01', dob: '1985-05-20' },
      { Eid: 103, firstName: 'Charlie', lastName: 'Brown', role: roles[2]._id, department: departments[2]._id, salary: 75000, hireDate: '2022-08-15', dob: '1992-11-12' },
      { Eid: 104, firstName: 'Diana', lastName: 'Miller', role: roles[3]._id, department: departments[3]._id, salary: 65000, hireDate: '2022-01-20', dob: '1994-03-25' },
      { Eid: 105, firstName: 'Ethan', lastName: 'Hunt', role: roles[4]._id, department: departments[4]._id, salary: 55000, hireDate: '2021-07-10', dob: '1988-10-30' },
      { Eid: 106, firstName: 'Fiona', lastName: 'Scott', role: roles[5]._id, department: departments[5]._id, salary: 72000, hireDate: '2021-09-15', dob: '1989-12-12' },
      { Eid: 107, firstName: 'George', lastName: 'Lee', role: roles[6]._id, department: departments[6]._id, salary: 68000, hireDate: '2021-05-10', dob: '1991-02-20' },
      { Eid: 108, firstName: 'Hannah', lastName: 'Adams', role: roles[7]._id, department: departments[7]._id, salary: 90000, hireDate: '2020-07-20', dob: '1987-03-18' },
      { Eid: 109, firstName: 'Ian', lastName: 'Carter', role: roles[8]._id, department: departments[8]._id, salary: 52000, hireDate: '2020-12-01', dob: '1995-01-15' },
      { Eid: 110, firstName: 'Jenna', lastName: 'Bishop', role: roles[9]._id, department: departments[9]._id, salary: 95000, hireDate: '2019-10-01', dob: '1984-09-14' },
    ]);

   
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
