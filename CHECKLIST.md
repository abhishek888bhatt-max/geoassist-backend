# Pre-Deployment Checklist ✅

## 1. Code Preparation
- [ ] All code committed to Git
- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] All dependencies in `package.json`
- [ ] Code tested locally

## 2. Environment Variables Setup
- [ ] `NODE_ENV=production`
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Strong random string (min 32 chars)
- [ ] `CSRF_SECRET` - Strong random string (min 32 chars)
- [ ] `ALLOWED_ORIGINS` - Your frontend URL(s)
- [ ] `PORT` - Server port (usually 5000)

## 3. Database Setup
- [ ] MongoDB Atlas account created (or local MongoDB ready)
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] Network access configured (allow connections)
- [ ] Database user created with password

## 4. Security Check
- [ ] CSRF protection enabled
- [ ] CORS configured with specific origins
- [ ] Input validation on all routes
- [ ] NoSQL injection prevention active
- [ ] Error messages don't leak sensitive info
- [ ] HTTPS enabled (in production)

## 5. GitHub Repository
- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] `.gitignore` properly configured
- [ ] README.md updated
- [ ] Repository is public (or deployment service has access)

## 6. Deployment Platform Choice
Choose ONE:
- [ ] Render (Easiest, Free tier)
- [ ] Railway (Fast, $5/month)
- [ ] AWS EC2 (Full control, ~$8/month)
- [ ] Heroku (Popular, $7/month)
- [ ] DigitalOcean (Droplet, $6/month)

## 7. Domain & SSL (Optional but Recommended)
- [ ] Domain name purchased
- [ ] DNS configured to point to server
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] HTTPS working

## 8. Testing
- [ ] API accessible via public URL
- [ ] CSRF token endpoint works: `GET /api/csrf-token`
- [ ] Registration works: `POST /api/auth/register`
- [ ] Login works: `POST /api/auth/login`
- [ ] Protected routes require JWT token
- [ ] CORS allows your frontend domain

## 9. Monitoring Setup
- [ ] Error logging configured
- [ ] Server monitoring enabled
- [ ] Database monitoring enabled
- [ ] Uptime monitoring (optional: UptimeRobot)

## 10. Documentation
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Frontend integration guide ready

---

## Quick Commands

### Generate Secrets
```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# CSRF Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Test API Locally
```bash
cd server
npm install
npm start
```

### Test Endpoints
```bash
# Health check
curl http://localhost:5000/api/csrf-token

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "x-csrf-token: YOUR_TOKEN" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

---

## Recommended: Fastest Deployment (10 minutes)

1. **MongoDB Atlas** (Free)
   - Sign up at mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string

2. **Render** (Free)
   - Sign up at render.com
   - Connect GitHub repo
   - Add environment variables
   - Deploy

3. **Done!** 🎉
   - Your API is live
   - URL: `https://your-app.onrender.com`

---

## Need Help?

- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app/
- AWS EC2: https://docs.aws.amazon.com/ec2/

---

## After Deployment

1. Test all endpoints with production URL
2. Update frontend to use production API URL
3. Monitor logs for errors
4. Set up automated backups (MongoDB Atlas does this)
5. Consider adding rate limiting for production
6. Set up CI/CD pipeline (optional)

**Your API is ready to go live! 🚀**
