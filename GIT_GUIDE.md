# Push Code to GitHub - Step by Step

## Step 1: Install Git (if not installed)
Download from: https://git-scm.com/download/win

## Step 2: Configure Git (First time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create GitHub Repository
1. Go to https://github.com
2. Click "+" (top right) → "New repository"
3. Name: `geoassist`
4. Keep it Public
5. DON'T check "Initialize with README"
6. Click "Create repository"

## Step 4: Push Your Code

Open Command Prompt in your project folder and run:

```bash
cd "c:\Users\ABHISHEK BHATT\OneDrive\documents\geoassist"

git init

git add .

git commit -m "Initial commit - GeoAssist Backend"

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/geoassist.git

git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Done! ✅

Your code is now on GitHub at:
`https://github.com/YOUR_USERNAME/geoassist`

---

## If You Get Authentication Error:

GitHub no longer accepts passwords. Use Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (all)
4. Click "Generate token"
5. **Copy the token** (you won't see it again!)
6. When pushing, use token as password

---

## Quick Commands Reference:

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```
