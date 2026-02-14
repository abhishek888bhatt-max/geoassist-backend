# Security Measures

## Implemented Security Features

### 1. **CSRF Protection**
- Using `csrf-csrf` library for double-submit cookie pattern
- CSRF tokens required for all state-changing operations (POST, PUT, DELETE)
- Tokens are httpOnly and use sameSite cookies

### 2. **NoSQL Injection Prevention**
- Input validation using `express-validator`
- Type checking to ensure inputs are strings
- Using `express-mongo-sanitize` to strip out MongoDB operators from user input
- Email normalization and lowercase conversion

### 3. **Secure CORS Configuration**
- Whitelist-based origin validation
- Configurable via `ALLOWED_ORIGINS` environment variable
- Credentials support enabled for cookie-based CSRF

### 4. **Input Validation**
- Email format validation
- Password minimum length enforcement (6 characters)
- Required field validation
- String type validation

### 5. **Authentication Security**
- JWT tokens with 1-hour expiration
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT_SECRET validation before token generation
- Case-insensitive email handling

### 6. **Error Handling**
- Generic error messages to prevent user enumeration
- Proper error logging for debugging
- Environment variable validation
- 404 handling for missing resources

### 7. **Environment Configuration**
- All sensitive values in environment variables
- `.env.example` provided for documentation
- Validation of required environment variables

## Environment Variables

Required environment variables:
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing (use strong random string)
- `CSRF_SECRET` - Secret for CSRF token generation (use strong random string)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins
- `NODE_ENV` - Environment (development/production)

## Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong secrets** - Generate random strings for JWT_SECRET and CSRF_SECRET
3. **Enable HTTPS in production** - Set `NODE_ENV=production`
4. **Regular dependency updates** - Run `npm audit` regularly
5. **Monitor logs** - Check error logs for suspicious activity

## Client Integration

To use the API with CSRF protection:

1. First, get CSRF token:
```javascript
const response = await fetch('http://localhost:5000/api/csrf-token', {
  credentials: 'include'
});
const { token } = await response.json();
```

2. Include token in subsequent requests:
```javascript
await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-csrf-token': token
  },
  credentials: 'include',
  body: JSON.stringify({ name, email, password })
});
```
