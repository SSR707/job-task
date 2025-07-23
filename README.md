# 📘 Task and Course Management API

This is a **RESTful API** built with **NestJS**, **MongoDB**, and **JWT Authentication**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-course-api.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3303
MONGO_URL=mongodb://localhost/job-task

ACCESS_TOKEN_KEY=example_key1
ACCESS_TOKEN_TIME=30m

REFRESH_TOKEN_KEY=example_key2
REFRESH_TOKEN_TIME=30d
```

### 4. Run the Project

```bash
npm run start:dev
```

---

## 📚 API Endpoints

### 🔐 Authentication

| Endpoint              | Method | Description              |
|-----------------------|--------|--------------------------|
| `/auth/studentRegister` | POST   | Register a new student   |
| `/auth/register`      | POST   | Register a new admin     |
| `/auth/login`         | POST   | Login and get JWT token  |

---

### 🧾 Task Endpoints (Authenticated)

| Endpoint        | Method | Description          |
|-----------------|--------|----------------------|
| `/tasks`        | POST   | Create a task        |
| `/tasks`        | GET    | Get user's tasks     |
| `/tasks/:id`    | GET    | Get task by ID       |
| `/tasks/:id`    | PUT    | Update task by ID    |
| `/tasks/:id`    | DELETE | Delete task by ID    |

---

### 🎓 Course Endpoints

| Endpoint                                  | Method | Description                          |
|-------------------------------------------|--------|--------------------------------------|
| `/course/:courseId/regiter`               | POST   | Register user to a course            |
| `/course`                                 | POST   | Create a course (Admin only)         |
| `/course/students/:id/courses`            | GET    | Get all courses of a student         |
| `/course`                                 | GET    | Get all courses                      |
| `/course/:id`                             | GET    | Get a course by ID                   |
| `/course/:id`                             | PUT    | Update course by ID (Admin only)     |
| `/course/:id`                             | DELETE | Delete course by ID (Admin only)     |

---

### 👤 User Endpoints

| Endpoint         | Method | Description                  |
|------------------|--------|------------------------------|
| /user/getProfile | GET    | Get current user profile     |
| /user            | GET    | Get all users (Admin only)   |
| /user/:id        | GET    | Get user by ID (Admin only)  |
| /user/:id        | PUT    | Update user by ID (Admin only) |
| /user/:id        | DELETE | Delete user by ID (Admin only) |

## ⚠️ Protected Routes

All protected routes require a Bearer Token in the header:

```
Authorization: Bearer <access_token>

```

### 🔑 How to Get JWT Token
To access protected endpoints, follow these steps to get a JWT token:

1. Send Login Request

POST /auth/login

```bash
{
  "email": "student@test.com",
  "password": "student123"
}
```
2. Receive Response
```bash
{
  "access_token": "your_access_token_here",
  "refresh_token": "your_refresh_token_here"
}
```

3. Use the Token in Requests
Add the access_token in the headers of your requests to protected routes:

```bash
Authorization: Bearer your_access_token_here
```

### 🧪 Test Student Credentials
Use the following credentials for testing as a student:

```bash
{
  name: 'sardor'
  "email": "student@test.com",
  "password": "student123"
}
```

## ⚙️ Technologies Used

- **NestJS** – Scalable server-side Node.js framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – Object modeling tool for MongoDB  
- **JWT** – Authentication and authorization  
- **Bcrypt** – Password hashing  
- **Swagger** –  API documentation generation