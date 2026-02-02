# Firebase Setup Guide

This guide will walk you through setting up Firebase for your portfolio in ~5 minutes.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "My Portfolio")
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this project)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

## Step 2: Register Your Web App

1. In the Firebase console, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Portfolio Website")
3. **Do NOT** check "Also set up Firebase Hosting"
4. Click **Register app**
5. You'll see your Firebase configuration - **keep this page open!**

## Step 3: Enable Firestore Database

1. In the left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (we'll secure it later)
4. Choose a Cloud Firestore location (pick the closest to you)
5. Click **Enable**

## Step 4: Enable Firebase Storage

1. In the left sidebar, click **Build** → **Storage**
2. Click **Get started**
3. Select **Start in test mode**
4. Click **Next**
5. Choose a location (same as Firestore)
6. Click **Done**

## Step 5: Copy Your Firebase Configuration

1. Go back to **Project Settings** (gear icon in sidebar)
2. Scroll down to **"Your apps"** section
3. You'll see your Firebase SDK configuration that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

4. **Copy this entire configuration object**

## Step 6: Update Your firebase-config.js File

1. Open `firebase-config.js` in your portfolio project
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

3. Save the file

## Step 7: Test the Integration

1. Open your portfolio admin panel: `http://localhost:8000/admin/`
2. Log in with your admin password
3. Go to **Settings** tab
4. Click **"🔄 Migrate to Firebase"**
5. If configured correctly, you'll see a success message!

## Step 8: Verify Data in Firebase Console

1. Go back to Firebase Console
2. Click **Firestore Database** in the sidebar
3. You should see collections: `profile`, `projects`, `certificates`, `gallery`, `settings`
4. Click **Storage** to see uploaded images

## Step 9: Secure Your Firebase (Important!)

### Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to everyone
    match /{document=**} {
      allow read: if true;
    }
    
    // Only allow writes from your domain (update with your actual domain)
    match /{document=**} {
      allow write: if request.auth != null || 
                     request.headers.origin.matches('https://akashrathaur.me') ||
                     request.headers.origin.matches('http://localhost:8000');
    }
  }
}
```

3. Click **Publish**

### Storage Security Rules

1. In Firebase Console, go to **Storage** → **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to everyone
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow writes only from your domain
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Troubleshooting

### "Firebase is not configured" Error

- Make sure you've updated `firebase-config.js` with your actual credentials
- Refresh the page after updating the config
- Check the browser console for errors

### Migration Fails

- Check that Firestore and Storage are enabled in Firebase Console
- Make sure you're using "test mode" rules initially
- Check browser console for specific error messages

### Images Not Uploading

- Verify Firebase Storage is enabled
- Check Storage rules allow writes
- Ensure images are under 10MB

## Next Steps

✅ Your portfolio now has cloud storage!
✅ Data persists across all devices
✅ Images are hosted on Firebase CDN
✅ No storage limits (within free tier)

### Free Tier Limits (More than enough!)

- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Storage**: 5GB storage, 1GB/day downloads
- **Bandwidth**: 10GB/month

For a personal portfolio, you'll never hit these limits!

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Firebase config is correct
3. Ensure Firestore and Storage are enabled
4. Check that security rules are published

Happy coding! 🚀
