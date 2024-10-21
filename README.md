# EasyPublish

## Overview
This EasyPublish is a Content Management System (CMS) that allows users to create, read, update, and delete blog articles. Users can view blogs without logging in, but they must register and log in to create their own blogs. The project includes user authentication, email verification with OTP, and a clean user interface built with Angular 16 and Nest.js.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [User Interface and User Experience (UI/UX)](#user-interface-and-user-experience-uiux)
- [Code Quality and Documentation](#code-quality-and-documentation)
- [Contributing](#contributing)
- [Contact Information](#contact-information)

## Features
- **Home Page**: View a selection of blogs and about the platform.
- **Blogs Page**: Access a comprehensive list of all blogs.
- **User Registration and Login**: Users can create accounts and log in.
- **Email Verification**: Users receive an OTP for email verification after registration.
- **Create Blog**: Logged-in users can create new blog posts.
- **Edit and Delete Blogs**: Users can manage their own blogs.
- **Profile Management**: Users can update their profile details and profile image.
- **Read More Functionality**: View the full content of blogs.
- **Secure Authentication**: Utilizes JWT for secure access.

## Technologies Used
- **Frontend**: Angular 16
- **Backend**: Nest.js with Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer for OTP sending
- **Storage**: Cloudinary for image storage
- **Authentication**: JWT for access and refresh tokens

## Installation Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Nasrin3868/EasyPublish.git
2. Navigate to the project directory:
    cd Easypublish
3. Install the backend dependencies:
   cd backend
   npm install
4. Set up the environment variables in a `.env` file based on the `.env.example` provided.
5. Install the frontend dependencies:
   cd ../frontend
   npm install

## Usage
1. Start the backend server:
   cd backend
   npm run start
2. Start the frontend application:
   cd frontend
   ng serve
3. Open your browser and visit `http://localhost:4200` to access the application.

## API Endpoints
Here are some key API endpoints used in the project:

- **POST /api/register**: Register a new user
- **POST /api/login**: Log in a user
- **GET /api/allblogs**: Retrieve all blogs
- **POST /api/user/createblog**: Create a new blog (requires authentication)
- **PUT /api/user/updateblog/:id**: Update an existing blog (requires authentication)
- **DELETE /api/user/deleteblog/:id**: Delete a blog (requires authentication)
- **GET /api/verify-otp**: Verify OTP sent to user's email

## Authentication and Authorization
- Users can register and log in to access create, update and delete blogs and edit profile details.
- After registration, an OTP is sent to the user's email for verification.
- JWT tokens are used to secure the API endpoints, ensuring that only authenticated users can create, edit, or delete blogs.

## User Interface and User Experience (UI/UX)
- The application is designed to be responsive and user-friendly.
- Users receive feedback for various actions, such as successful logins or errors during form submissions.

## Code Quality and Documentation
- Code is organized, clean, and well-documented.
- A version control system (Git) is used for managing code changes.
- This README file includes setup and usage instructions.

## Contributing
Contributions are welcome! If you would like to contribute to the project, please fork the repository and submit a pull request.

## Contact Information
For any questions or feedback, feel free to reach out:
- GitHub: [Nasrin3868](https://github.com/Nasrin3868)
- Email: er.fathimanasrin@gmail.com