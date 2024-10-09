Job Portal Backend API
======================

This is the backend API for a Job Portal application. It provides features for job seekers, companies, and admins to interact with job listings, applications, job seekers' profiles, and company profiles. The API is built using Node.js with Express and Prisma as the ORM for database interactions.

Table of Contents
-----------------

*   [Features](#features)
    
*   [Technologies Used](#technologies-used)
    
*   [Project Structure](#project-structure)
    
*   [Installation and Setup](#installation-and-setup)
    
*   [Authentication and Authorization](#authentication-and-authorization)
    
*   [API Endpoints](#api-endpoints)
    
*   [Error Handling](#error-handling)
    
*   [Environment Variables](#environment-variables)
    
*   [Database Structure](#database-structure)
    
*   [Testing](#testing)
    
*   [License](#license)
    

Features
--------

*   **User Registration and Authentication**
    
    *   Registration for Job Seekers and Companies
        
    *   JWT-based Authentication for secure access
        
    *   Role-based access control (Admin, Job Seeker, Company)
        
*   **Profile Management**
    
    *   Create, update, and delete job seeker profiles
        
    *   Create, update, and delete company profiles
        
*   **Job Listings**
    
    *   Create, update, and delete job postings by companies
        
    *   Search and filter job postings by title, job field, company, and more
        
*   **Application Management**
    
    *   Job seekers can apply for jobs
        
    *   Companies can view, update, and manage applications for their job postings
        
*   **Certification and Work Experience**
    
    *   Job seekers can add and manage their certifications and work experience
        
*   **Search Functionality**
    
    *   Search for jobs, job seekers, and companies with advanced filters
        
*   **Soft Deletion**
    
    *   Implemented soft deletion for records to keep data integrity and history
        

Technologies Used
-----------------

*   **Backend Framework:** Node.js with Express
    
*   **Database:** PostgreSQL (via Prisma ORM)
    
*   **Authentication:** JWT (JSON Web Token)
    
*   **Testing Frameworks:** Jest, Mocha, and Chai
    
*   **Error Handling:** Centralized error handling with custom error middleware
    
*   **Security:** Helmet for securing HTTP headers, CORS configuration, and data validation
    


### Explanation of Key Directories

*   **config/**: Contains configuration files for the database, environment variables, JWT setup, and logger.
    
*   **controllers/**: Handles the logic for each API endpoint, processing requests, and sending responses.
    
*   **services/**: Contains the business logic and interacts with the Prisma ORM to perform database operations.
    
*   **routes/**: Defines API routes and maps them to their corresponding controllers.
    
*   **middlewares/**: Includes middleware for authentication, authorization, error handling, and data validation.
    
*   **interfaces/**: Defines the types and data structures used across the project.
    
*   **enums/**: Holds enums for managing user roles, job types, and application statuses.
    

Installation and Setup
----------------------

### Prerequisites

*   Node.js (>=14.x)
    
*   PostgreSQL
    
*   npm (Node Package Manager)
    

### Steps to Set Up

1.  bashCopy codegit clone https://github.com/dayoonasanya/forjobseeker.git job-portal-backend
    
2.  bashCopy codenpm install
    
3.  Create a .env file in the root of the project and add the following variables:makefileCopy codeDATABASE\_URL=postgresql://username:password@localhost:5432/database\_nameJWT\_SECRET=your\_jwt\_secret\_keyPORT=5000
    
4.  bashCopy codenpx prisma migrate dev --name init
    
5.  bashCopy codenpm start
    
6.  **Access the API at:** http://localhost:5000/api/
    

Authentication and Authorization
--------------------------------

The application uses JWT for authentication and role-based access control for authorization. Users must log in to obtain a token, which should be included in the Authorization header as Bearer for each protected API request.

### User Roles

*   **Admin**: Full access to all resources.
    
*   **Company**: Can manage job postings and view job seeker profiles.
    
*   **Job Seeker**: Can view and apply for jobs, manage their profiles, and update their skills and certifications.
    

API Endpoints
-------------

### User Authentication

*   **POST** /api/auth/register - Register a new user
    
*   **POST** /api/auth/login - Log in and get an access token
    

### Job Seekers

*   **GET** /api/jobseekers/:id - Get job seeker profile by ID
    
*   **PATCH** /api/jobseekers/:id - Update job seeker profile
    

### Companies

*   **POST** /api/companies/create - Create a new company profile
    
*   **GET** /api/companies/:id - Get company profile by ID
    
*   **PATCH** /api/companies/:id - Update company profile
    

### Jobs

*   **POST** /api/jobs/create - Create a new job posting
    
*   **GET** /api/jobs/:id - Get job by ID
    
*   **GET** /api/jobs - Search for jobs with filters
    

### Applications

*   **POST** /api/applications/create - Apply for a job
    
*   **GET** /api/applications/:id - Get application details
    

### Search

*   **GET** /api/search/jobs - Search jobs with filters
    
*   **GET** /api/search/jobseekers - Search job seekers
    
*   **GET** /api/search/companies - Search companies
    

Error Handling
--------------

*   Centralized error handling is implemented using a custom middleware that formats error messages and returns appropriate HTTP status codes.
    
*   Known errors are handled gracefully with detailed messages for debugging.
    

Environment Variables
---------------------

The project uses environment variables to manage configurations. These include:

*   DATABASE\_URL: The connection string for the PostgreSQL database.
    
*   JWT\_SECRET: Secret key for signing JWT tokens.
    
*   PORT: The port on which the server runs.
    

Database Structure
------------------

The database is designed using Prisma ORM, with models for the following entities:

*   **User**: Stores user credentials and role information.
    
*   **JobSeeker**: Contains job seeker profile details.
    
*   **Company**: Contains company profile details.
    
*   **Job**: Stores job listings posted by companies.
    
*   **Application**: Represents job applications submitted by job seekers.
    
*   **Certification**: Stores job seekers' certifications.
    
*   **WorkExperience**: Contains job seekers' work experience details.
    

Testing
-------

*   **Unit Tests**: Located in the /tests folder and executed with Jest.
    
*   **Integration Tests**: Validate API endpoints using tools like Mocha and Chai.
    


License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.