# GitHub Pages Setup Guide

## ✅ Fixed Issues

The GitHub Actions workflow has been updated to fix common deployment failures:

### Changes Made:
1. **Separated build and deploy jobs** - More reliable workflow
2. **Added proper environment configuration** - Required for GitHub Pages
3. **Added concurrency control** - Prevents conflicting deployments
4. **Restored `dist/` to `.gitignore`** - GitHub Actions builds automatically

## 🚀 Setup Steps

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. Save the settings

### Step 2: Push Your Code
```bash
git add .
git commit -m "Fix GitHub Pages deployment workflow"
git push origin main
```

### Step 3: Monitor Deployment
1. Go to the **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. If successful, your site will be live at: `https://[username].github.io/namnsdag-idag/`

## 🔧 Troubleshooting Common Issues

### Issue: "Repository not found" or 404 errors
**Solution**: Check that the `base` path in `vite.config.js` matches your repository name exactly:
```javascript
base: '/namnsdag-idag/', // Must match your repo name
```

### Issue: Workflow fails on "Deploy to GitHub Pages" step
**Solution**: 
1. Ensure GitHub Pages is enabled with "GitHub Actions" as source
2. Check repository permissions (Settings → Actions → General)
3. Verify the workflow has proper permissions

### Issue: Site loads but assets are missing
**Solution**: The `base` path in Vite config is incorrect. Update it to match your repository name.

### Issue: Build fails during npm ci
**Solution**: 
1. Delete `package-lock.json` locally
2. Run `npm install` to regenerate it
3. Commit and push the new lock file

## 📋 Current Configuration

### Workflow File: `.github/workflows/deploy.yml`
- ✅ Builds on Node.js 18
- ✅ Uses `npm ci` for reliable installs
- ✅ Separate build and deploy jobs
- ✅ Proper GitHub Pages environment

### Vite Config: `vite.config.js`
- ✅ Base path: `/namnsdag-idag/`
- ✅ Output directory: `dist/`
- ✅ React plugin configured

### Dependencies
- ✅ All required packages in `package.json`
- ✅ Build scripts configured
- ✅ No missing dependencies

## 🎯 Next Steps

1. **Push the updated workflow** to trigger deployment
2. **Enable GitHub Actions** in repository Pages settings
3. **Monitor the Actions tab** for deployment status
4. **Visit your live site** once deployment completes

Your site will be available at: `https://[your-username].github.io/namnsdag-idag/`
