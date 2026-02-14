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
- **Security:** bcryptjs, express-mongo-sanitize, csrf-csrf, express-validator
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

1. Client requests CSRF token from `/api/csrf-token`
2. User registers with email and password  
3. Password is hashed using bcrypt  
4. User logs in with valid credentials (with CSRF token)  
5. Server generates a JWT token  
6. Token is sent in request headers as: `Authorization: Bearer <token>`
7. Middleware verifies the token  
8. Access is granted to protected routes  

---

## 📡 API Endpoints

### 🔹 Get CSRF Token
**GET** `/api/csrf-token`

**Response:**
```json
{
  "token": "<csrf-token>"
}
```

### 🔹 Register User
**POST** `/api/auth/register`

**Headers:**
```
x-csrf-token: <csrf-token>
```

**Request Body:**
```json
{
  "name": "<user-name>",
  "email": "<user-email>",
  "password": "<secure-password>"
}
