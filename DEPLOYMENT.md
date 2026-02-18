# Deployment Guide - GeoAssist Backend

## Quick Deployment Options

### Option 1: AWS EC2 (Recommended for Full Control)
### Option 2: Render (Easiest - Free Tier Available)
### Option 3: Railway (Simple & Fast)
### Option 4: Heroku (Popular Choice)

---

## 🚀 Option 1: Deploy to Render (FREE & EASIEST)

### Step 1: Prepare Your Code
```bash
# Make sure all changes are committed
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/geoassist.git
git branch -M main
git push -u origin main
```

### Step 3: Setup MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/geoassist`)

### Step 4: Deploy on Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: geoassist-api
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 5: Add Environment Variables on Render
Go to "Environment" tab and add:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CSRF_SECRET=your-super-secret-csrf-key-min-32-chars
ALLOWED_ORIGINS=https://your-frontend-domain.com
PORT=5000
```

### Step 6: Deploy
Click "Create Web Service" - Your API will be live at: `https://geoassist-api.onrender.com`

---

## 🚀 Option 2: Deploy to Railway (FAST)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login & Deploy
```bash
cd server
railway login
railway init
railway up
```

### Step 3: Add Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set MONGO_URI=your-mongodb-uri
railway variables set JWT_SECRET=your-jwt-secret
railway variables set CSRF_SECRET=your-csrf-secret
railway variables set ALLOWED_ORIGINS=your-frontend-url
```

---

## 🚀 Option 3: Deploy to AWS EC2

### Step 1: Launch EC2 Instance
1. Go to AWS Console → EC2
2. Launch Ubuntu 22.04 instance (t2.micro for free tier)
3. Download .pem key file

### Step 2: Connect to Server
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 3: Install Node.js & MongoDB
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 4: Deploy Your Code
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/geoassist.git
cd geoassist/server

# Install dependencies
npm install

# Create .env file
nano .env
```

Add your production environment variables:
```
NODE_ENV=production
MONGO_URI=mongodb://127.0.0.1:27017/geoassist
JWT_SECRET=your-super-secret-jwt-key
CSRF_SECRET=your-super-secret-csrf-key
ALLOWED_ORIGINS=https://your-frontend-domain.com
PORT=5000
```

### Step 5: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start app.js --name geoassist
pm2 startup
pm2 save
```

### Step 6: Setup Nginx (Reverse Proxy)
```bash
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/geoassist
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/geoassist /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: Setup SSL (HTTPS)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Generate Strong Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate CSRF_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] MongoDB connection string updated
- [ ] Strong JWT_SECRET generated
- [ ] Strong CSRF_SECRET generated
- [ ] ALLOWED_ORIGINS set to your frontend URL
- [ ] NODE_ENV=production
- [ ] .env file in .gitignore
- [ ] Code pushed to GitHub
- [ ] Dependencies installed
- [ ] Test API endpoints

---

## 🧪 Test Your Live API

```bash
# Get CSRF Token
curl https://your-api-url.com/api/csrf-token

# Register User
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -H "x-csrf-token: YOUR_TOKEN" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Login
curl -X POST https://your-api-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -H "x-csrf-token: YOUR_TOKEN" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 📊 Monitoring & Maintenance

### View Logs (PM2)
```bash
pm2 logs geoassist
pm2 monit
```

### Restart Server
```bash
pm2 restart geoassist
```

### Update Code
```bash
cd geoassist/server
git pull
npm install
pm2 restart geoassist
```

---

## 💰 Cost Estimate

- **Render Free Tier**: $0/month (sleeps after inactivity)
- **Railway**: $5/month (500 hours)
- **AWS EC2 t2.micro**: Free for 12 months, then ~$8/month
- **MongoDB Atlas**: Free (512MB)
- **Domain**: ~$10-15/year (optional)

---

## 🎯 Recommended: Render + MongoDB Atlas

**Total Cost: $0/month** (Perfect for starting out!)

1. Deploy backend on Render (Free)
2. Use MongoDB Atlas (Free 512MB)
3. Deploy frontend on Vercel/Netlify (Free)
4. Add custom domain later (optional)

Your API will be live in ~10 minutes! 🚀
