# 🚀 Quick Start - Make Your Code LIVE in 10 Minutes

## Fastest Way: Render + MongoDB Atlas (100% FREE)

### Step 1: Setup MongoDB (3 minutes)
1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click "Try Free" → Sign up
3. Create a **FREE** cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. **Copy the connection string** (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add `/geoassist` at the end

**Your MONGO_URI**: `mongodb+srv://username:password@cluster.mongodb.net/geoassist`

---

### Step 2: Push to GitHub (2 minutes)
```bash
cd "c:\Users\ABHISHEK BHATT\OneDrive\documents\geoassist"
git init
git add .
git commit -m "Ready for deployment"
```

Create repository on GitHub, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/geoassist.git
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy on Render (5 minutes)
1. Go to **https://render.com**
2. Click "Get Started for Free" → Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your `geoassist` repository
5. Configure:
   - **Name**: `geoassist-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Click "Advanced" → Add Environment Variables:

```
NODE_ENV = production
PORT = 5000
MONGO_URI = mongodb+srv://your-connection-string-from-step1
JWT_SECRET = (click "Generate" button)
CSRF_SECRET = (click "Generate" button)
ALLOWED_ORIGINS = http://localhost:3000
```

7. Click **"Create Web Service"**

---

### Step 4: Done! 🎉

Your API is now LIVE at: `https://geoassist-api.onrender.com`

**Test it:**
```bash
curl https://geoassist-api.onrender.com/api/csrf-token
```

---

## Alternative: Local Testing First

### Windows:
```bash
cd "c:\Users\ABHISHEK BHATT\OneDrive\documents\geoassist"
start.bat
```

### Your API runs at: `http://localhost:5000`

---

## API Endpoints (After Deployment)

Replace `YOUR_URL` with your Render URL:

### 1. Get CSRF Token
```bash
GET https://YOUR_URL/api/csrf-token
```

### 2. Register User
```bash
POST https://YOUR_URL/api/auth/register
Headers: 
  Content-Type: application/json
  x-csrf-token: <token-from-step-1>
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 3. Login
```bash
POST https://YOUR_URL/api/auth/login
Headers:
  Content-Type: application/json
  x-csrf-token: <token-from-step-1>
Body:
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 4. Get Profile (Protected)
```bash
GET https://YOUR_URL/api/users/profile
Headers:
  Authorization: Bearer <jwt-token-from-login>
```

---

## What You Get (FREE)

✅ **Render Free Tier**:
- 750 hours/month
- Auto-deploy from GitHub
- HTTPS included
- Custom domain support

✅ **MongoDB Atlas Free Tier**:
- 512 MB storage
- Shared cluster
- Automatic backups

✅ **Total Cost**: **$0/month**

---

## Next Steps

1. ✅ Deploy backend (you just did this!)
2. 🎨 Build your frontend (React/Vue/Angular)
3. 🔗 Connect frontend to your API URL
4. 🌐 Deploy frontend on Vercel/Netlify (also free!)
5. 🎉 Your full-stack app is LIVE!

---

## Troubleshooting

**API not responding?**
- Check Render logs: Dashboard → Your Service → Logs
- Verify environment variables are set
- Check MongoDB Atlas network access (allow 0.0.0.0/0)

**CORS errors?**
- Add your frontend URL to `ALLOWED_ORIGINS`
- Format: `https://yourfrontend.vercel.app`

**Database connection failed?**
- Verify MONGO_URI is correct
- Check MongoDB Atlas user has read/write permissions
- Ensure IP whitelist includes 0.0.0.0/0

---

## Support Files Created

📄 `DEPLOYMENT.md` - Detailed deployment guide for all platforms
📄 `CHECKLIST.md` - Pre-deployment checklist
📄 `SECURITY.md` - Security features documentation
📄 `render.yaml` - Render configuration
📄 `Dockerfile` - Docker deployment
📄 `ecosystem.config.js` - PM2 configuration

---

## 🎯 You're Ready!

Your secure, production-ready API is ready to deploy. Follow the 3 steps above and you'll be live in 10 minutes! 🚀
