# Deployment Guide for akashrathaur.me

This guide will help you deploy your portfolio to your custom domain **akashrathaur.me** with the admin panel accessible at **akashrathaur.me/admin**.

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Web Interface**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your portfolio folder or connect GitHub repo
   - Vercel will auto-detect it as a static site
   - Click "Deploy"

3. **Configure Custom Domain**:
   - Go to Project Settings → Domains
   - Add `akashrathaur.me`
   - Follow Vercel's DNS instructions:
     - Add an A record pointing to Vercel's IP
     - Or add a CNAME record pointing to `cname.vercel-dns.com`
   - SSL certificate is automatic!

4. **Your URLs**:
   - Portfolio: `https://akashrathaur.me`
   - Admin Panel: `https://akashrathaur.me/admin`

### Option 2: Netlify

1. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your Portfolio folder
   - Or connect GitHub repository

2. **Configure Custom Domain**:
   - Go to Site Settings → Domain Management
   - Add custom domain: `akashrathaur.me`
   - Follow DNS configuration instructions
   - SSL is automatic!

3. **Your URLs**:
   - Portfolio: `https://akashrathaur.me`
   - Admin Panel: `https://akashrathaur.me/admin`

### Option 3: GitHub Pages

1. **Create GitHub Repository**:
   ```bash
   cd /Users/asr/Documents/Projects/Portfolio
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from main branch
   - Save

3. **Configure Custom Domain**:
   - In Settings → Pages → Custom domain
   - Enter: `akashrathaur.me`
   - Create a file named `CNAME` in your repository with content: `akashrathaur.me`
   
4. **DNS Configuration**:
   Add these records to your domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

5. **Your URLs**:
   - Portfolio: `https://akashrathaur.me`
   - Admin Panel: `https://akashrathaur.me/admin`

## DNS Configuration

Regardless of hosting provider, you'll need to configure DNS at your domain registrar (where you bought akashrathaur.me):

### For Vercel:
- **A Record**: `@` → `76.76.21.21`
- Or **CNAME**: `@` → `cname.vercel-dns.com`

### For Netlify:
- **A Record**: `@` → (provided by Netlify)
- **CNAME**: `www` → `your-site.netlify.app`

### For GitHub Pages:
- **A Records**: (see Option 3 above)
- **CNAME**: `www` → `YOUR_USERNAME.github.io`

## Testing Locally

Before deploying, test locally:

```bash
cd /Users/asr/Documents/Projects/Portfolio
python3 -m http.server 8000
```

Then visit:
- Portfolio: `http://localhost:8000`
- Admin Panel: `http://localhost:8000/admin`

## Post-Deployment Checklist

✅ Portfolio loads at `https://akashrathaur.me`  
✅ Admin panel loads at `https://akashrathaur.me/admin`  
✅ Can login with password  
✅ Can add/edit projects  
✅ Can add/edit certificates  
✅ Can upload images  
✅ Changes reflect on main portfolio  
✅ SSL certificate is active (https)  
✅ Mobile responsive design works  

## Important Notes

### localStorage Limitation
- Your data is stored in browser localStorage
- Data is device/browser-specific
- **Always export your data** before clearing browser cache
- Consider setting up regular backups

### Security
- Change the default password (`admin123`) immediately
- Use a strong password (Settings → Change Password)
- Don't share your admin URL publicly

### Updating Content
1. Visit `https://akashrathaur.me/admin`
2. Login with your password
3. Make changes
4. Changes appear instantly on the main site

## Firebase Setup (Cloud Storage)

Your portfolio now supports **Firebase** for cloud-based data storage! This means your data persists across all devices and browsers.

### Why Use Firebase?
- ✅ **Cloud storage** - Access your data from anywhere
- ✅ **No storage limits** (within generous free tier)
- ✅ **Image hosting** - Professional CDN for images
- ✅ **Real-time sync** - Changes sync across devices
- ✅ **100% Free** for personal portfolios

### Setup Instructions

**📖 See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed step-by-step instructions**

Quick steps:
1. Create a free Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database and Firebase Storage
3. Copy your Firebase configuration
4. Update `firebase-config.js` with your credentials
5. Go to admin panel → Settings → Click "Migrate to Firebase"
6. Done! Your data is now in the cloud ☁️

### Firebase vs localStorage

| Feature | localStorage | Firebase |
|---------|-------------|----------|
| Storage Location | Browser only | Cloud |
| Access from other devices | ❌ No | ✅ Yes |
| Survives cache clear | ❌ No | ✅ Yes |
| Image storage limit | ~5-10MB | 5GB (free tier) |
| Setup time | 0 min | ~5 min |
| Cost | Free | Free |

**Recommendation**: Set up Firebase for a professional, production-ready portfolio!


## Troubleshooting

### Admin panel shows 404
- Make sure the `/admin` folder exists
- Check that `index.html` is inside `/admin`
- Verify hosting platform supports directory routing

### Images not loading
- Check browser console for errors
- Ensure images are properly compressed
- Verify localStorage isn't full

### DNS not propagating
- DNS changes can take 24-48 hours
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation
- Clear browser cache

### SSL certificate issues
- Most platforms (Vercel, Netlify) provide automatic SSL
- Wait a few minutes after domain configuration
- Check platform documentation

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages

---

**Recommended**: Use Vercel for the easiest deployment with automatic SSL and great performance!
