# Portfolio Website - No-Code Content Management

A modern, self-contained portfolio website with a built-in admin panel that allows you to manage your content without writing any code.

## 🚀 Quick Start

### 1. Open the Portfolio
Simply open `index.html` in your web browser to view your portfolio.

### 2. Access Admin Panel
Open `admin.html` in your web browser to manage your content.

**Default Password:** `admin123`

⚠️ **Important:** Change this password immediately after first login!

## 📋 Features

### Admin Panel
- **Profile Management**: Update your name, title, bio, profile picture, and social links
- **Projects Management**: Add, edit, and delete projects with images, descriptions, and tech stack
- **Certificates Management**: Add, edit, and delete certificates with images and details
- **Gallery Management**: Upload and manage portfolio images
- **Settings**: Change admin password, export/import data, clear all data

### Public Portfolio
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Premium design with gradients, animations, and smooth transitions
- **Project Filtering**: Filter projects by technology
- **Image Lightbox**: Click on images to view them in full screen
- **Smooth Scrolling**: Navigate smoothly between sections

## 🎨 How to Update Your Portfolio

### Update Profile Information

1. Open `admin.html` in your browser
2. Login with your password
3. Click on the **Profile** tab
4. Fill in your information:
   - Full Name
   - Title/Role
   - Bio
   - Email, Phone, Location
   - Social media links (GitHub, LinkedIn, Twitter, Website)
5. Upload a profile picture (optional)
6. Click **Save Profile**

### Add a Project

1. Go to the **Projects** tab
2. Click **+ Add Project**
3. Fill in the project details:
   - Title
   - Description
   - Technologies (comma-separated, e.g., "React, Node.js, MongoDB")
   - Live URL (optional)
   - GitHub URL (optional)
   - Check "Featured Project" to highlight it
4. Upload a project image (optional)
5. Click **Save Project**

### Add a Certificate

1. Go to the **Certificates** tab
2. Click **+ Add Certificate**
3. Fill in the certificate details:
   - Title
   - Issuer (e.g., "Coursera", "Google")
   - Date
   - Description (optional)
   - Credential URL (optional)
4. Upload a certificate image (optional)
5. Click **Save Certificate**

### Add Gallery Images

1. Go to the **Gallery** tab
2. Click **+ Add Image**
3. Select one or multiple images
4. Images will be automatically compressed and uploaded

### Edit or Delete Items

- Click the **Edit** button on any project or certificate to modify it
- Click the **Delete** button to remove it (confirmation required)

## ⚙️ Settings

### Change Password

1. Go to the **Settings** tab
2. Enter your new password
3. Confirm the password
4. Click **Update Password**

### Export Data

1. Go to the **Settings** tab
2. Click **📥 Export Data**
3. A JSON file will be downloaded with all your portfolio data
4. Keep this file as a backup!

### Import Data

1. Go to the **Settings** tab
2. Click **📤 Import Data**
3. Select your previously exported JSON file
4. All data will be restored

### Clear All Data

1. Go to the **Settings** tab
2. Click **🗑️ Clear All Data**
3. Confirm twice (this cannot be undone!)
4. All projects, certificates, and gallery images will be deleted

## 💾 Data Storage

Your portfolio uses **localStorage** to store all data in your browser. This means:

✅ **Pros:**
- 100% free, no server needed
- Works offline
- Instant updates
- No database setup required

⚠️ **Cons:**
- Data is stored only in your current browser
- Clearing browser data will delete your portfolio content
- Storage limit: ~5-10MB (sufficient for most portfolios)

**Recommendation:** Regularly export your data as a backup!

## 🖼️ Image Guidelines

### Best Practices
- **Profile Picture**: 400x400px, square format
- **Project Images**: 1200x800px, landscape format
- **Certificate Images**: 1200x900px, landscape format
- **Gallery Images**: 1200x1200px, square or landscape

### File Size
- Images are automatically compressed when uploaded
- Recommended: Keep original images under 2MB each
- The system will compress them to ~200-500KB

## 🌐 Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Upload all portfolio files to the repository
4. Go to Settings → Pages
5. Select the main branch as source
6. Your portfolio will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Create a Netlify account
2. Drag and drop your portfolio folder
3. Your site will be live instantly
4. You get a free subdomain: `https://your-site.netlify.app`

### Option 3: Vercel (Free)

1. Create a Vercel account
2. Import your portfolio folder
3. Deploy with one click
4. Free subdomain: `https://your-site.vercel.app`

## 🔧 Troubleshooting

### Portfolio shows "No projects/certificates yet"
- Make sure you've added content through the admin panel
- Check that you're viewing the portfolio in the same browser where you added content

### Images not showing
- Ensure images are in common formats (JPG, PNG, WebP)
- Check that images are not too large (under 5MB recommended)
- Try using the export/import feature to reset data

### Password not working
- Passwords are case-sensitive
- If you forgot your password, open browser DevTools (F12)
- Go to Application → Local Storage → `portfolio_admin_password`
- Delete this item and refresh the page (password will reset to `admin123`)

### Storage quota exceeded
- You've reached the browser's storage limit (~5-10MB)
- Delete some images from the gallery
- Use lower resolution images
- Consider using external image hosting (Imgur, Cloudinary)

## 🎯 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Access

To update your portfolio from mobile:
1. Open `admin.html` on your mobile browser
2. The admin panel is fully responsive
3. You can upload images from your phone's camera or gallery

## 🔒 Security Notes

- The admin panel uses a simple password protection
- This is suitable for personal portfolios
- For production use, consider:
  - Using a strong password
  - Not sharing your admin URL publicly
  - Regularly backing up your data

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Make sure you're using a modern browser
3. Try exporting and re-importing your data
4. Clear browser cache and try again

## 📄 License

This portfolio template is free to use for personal and commercial projects.

---

**Made with ❤️ for easy portfolio management**
