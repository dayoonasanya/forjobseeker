### forjobseekers![Screenshot 2024-10-15 151048](https://github.com/user-attachments/assets/3c614664-68a3-43f3-beb2-fee242b971c7)


# ForJobSeekers

ForJobSeeker is a comprehensive job search and application platform that helps job seekers find remote job opportunities, create and update their profiles, and track their applications. This platform streamlines the job-seeking process and provides an intuitive user experience for individuals looking for remote job opportunities.

## Features

- **Job Listings**: Browse and search for remote job opportunities.
- **Profile Management**: Create and update job seeker profiles, including personal details, skills, experience, and more.
- **Job Applications**: Apply for jobs and track the status of applications.
- **User Authentication**: Secure user registration and login.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.

## Technologies Used

### Backend

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**: JavaScript runtime for building scalable network applications.
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express.js**: Fast, minimalist web framework for Node.js.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) **Prisma**: Modern ORM for TypeScript and Node.js.

### Frontend

- ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) **Angular 18**: Framework for building client-side applications.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

## Folder Structure

The folder structure of the ForJobSeeker project is as follows:

    ```plaintext
    forjobseeker/
    ├── backend/
    │   ├── src/
    │   │   ├── controllers/    # Controllers for handling requests
    │   │   ├── middlewares/    # Middleware functions
    │   │   ├── models/         # Prisma models
    │   │   ├── routes/         # Route definitions
    │   │   ├── services/       # Business logic services
    │   │   ├── utils/          # Utility functions
    │   │   └── index.ts        # Main entry point for the backend server
    │   ├── prisma/             # Prisma schema and migrations
    │   └── package.json        # Backend dependencies and scripts
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── app/            # Main Angular application module
    │   │   ├── components/     # Reusable UI components
    │   │   ├── pages/          # Page-level components
    │   │   ├── services/       # Services for API calls and state management
    │   │   └── main.ts         # Main entry point for the Angular application
    │   └── package.json        # Frontend dependencies and scripts
    │
    ├── .gitignore              # Git ignore file
    ├── README.md               # Project documentation
    └── LICENSE                 # License for the project



## Getting Started

Clone the Repository:

    ```bash
    git clone https://github.com/victorpreston/forjobseeker.git

    
Navigate to the Project Directory:

    ```bash
    cd forjobseeker

    
Install Backend Dependencies:

    ```bash
    cd backend
    npm install
    
Set Up Environment Variables:

Create a `.env` file in the backend directory with the following content:

    
Run the Backend Server:

    ```bash
    npm run dev
    
Navigate to the Frontend Directory:

    ```bash
    cd ../frontend
Install Frontend Dependencies:

    ```bash
    npm install
    
Start the Frontend Server:

    ```bash
    npm start
    
### Usage
Once both the backend and frontend servers are running, access the application at http://localhost:4200 to browse job listings, manage your profile, and apply for jobs.

### Contributing
Contributions are welcome! Please follow these steps if you'd like to contribute to the ForJobSeeker project:

1. Fork the repository.
2. Create a new branch `(git checkout -b feature-branch).`
3. Make your changes and commit them `(git commit -m 'Add new feature')`.
4. Push to the branch `(git push origin feature-branch)`.
5. Open a pull request.

