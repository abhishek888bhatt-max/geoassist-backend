# GeoAssist – Backend Authentication API

GeoAssist is a production-ready backend application built with **Node.js, Express, and MongoDB**.  
It implements secure user authentication using **JWT (JSON Web Tokens)** and follows clean backend architecture.

---

## 🚀 Features

- User registration with hashed passwords
- User login with JWT token generation
- JWT-based authentication & authorization
- Protected routes using middleware
- Token expiry handling
- MongoDB database integration
- Clean and scalable folder structure

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Security:** bcryptjs
- **Environment Variables:** dotenv

---

## 📂 Project Structure

GeoAssist/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── userController.js
│
├── middleware/
│ └── authMiddleware.js
│
├── models/
│ └── User.js
│
├── routes/
│ ├── authRoutes.js
│ └── userRoutes.js
│
├── .env
├── app.js
├── package.json
├── README.md

---

## 🔐 Authentication Flow

1. User registers with email and password  
2. Password is hashed using bcrypt  
3. User logs in with valid credentials  
4. Server generates a JWT token  
5. Token is sent in request headers as:


6. Middleware verifies the token  
7. Access is granted to protected routes  

---

## 📡 API Endpoints

### 🔹 Register User
**POST** `/api/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
