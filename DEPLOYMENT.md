# Vercel Deployment Guide for Micro-Frontend Architecture

This guide will help you deploy your micro-frontend architecture to Vercel.

## 📋 Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed globally: `npm install -g vercel`
3. All three apps working locally

## 🚀 Deployment Steps

### Step 1: Deploy Chat App (Remote 1)

1. Navigate to the chat-app directory:
   ```bash
   cd chat-app
   ```

2. Login to Vercel (if not already logged in):
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. **Important**: Note the production URL (e.g., `https://chat-app-xxx.vercel.app`)

### Step 2: Deploy Email App (Remote 2)

1. Navigate to the email-app directory:
   ```bash
   cd ../email-app
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. **Important**: Note the production URL (e.g., `https://email-app-xxx.vercel.app`)

### Step 3: Deploy Host App

1. Navigate to the host-app directory:
   ```bash
   cd ../host-app
   ```

2. Set environment variables for the remote apps:
   ```bash
   vercel env add CHAT_APP_URL
   ```
   Enter the chat-app URL (e.g., `https://chat-app-xxx.vercel.app`)

   ```bash
   vercel env add EMAIL_APP_URL
   ```
   Enter the email-app URL (e.g., `https://email-app-xxx.vercel.app`)

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Your host app should now be live!

## 🔧 Alternative: Using Vercel Dashboard

If you prefer using the Vercel dashboard:

### For Chat App and Email App:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select the appropriate app directory (chat-app or email-app)
4. Set the **Root Directory** to the app folder
5. Click **Deploy**

### For Host App:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select the host-app directory
4. Set the **Root Directory** to `host-app`
5. Add environment variables:
   - `CHAT_APP_URL`: Your deployed chat-app URL
   - `EMAIL_APP_URL`: Your deployed email-app URL
6. Click **Deploy**

## ⚙️ Environment Variables Setup (Dashboard Method)

For the **host-app** deployment:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add the following variables:
   - **Variable Name**: `CHAT_APP_URL`
     **Value**: `https://your-chat-app.vercel.app`
   - **Variable Name**: `EMAIL_APP_URL`
     **Value**: `https://your-email-app.vercel.app`
4. Redeploy the host-app

## 🔄 Redeployment

Whenever you make changes:

1. **For remote apps (chat/email)**: Just redeploy them. The host app will automatically fetch the latest version.
2. **For host app**: Redeploy if you change the host app code or environment variables.

## 📝 Important Notes

1. **CORS Headers**: The `vercel.json` files include CORS headers to allow cross-origin requests for Module Federation.

2. **Build Output**: All apps build to a `dist` directory, which Vercel will serve.

3. **Environment Variables**: The webpack configs use environment variables to determine remote URLs:
   - Development: Uses `localhost` URLs
   - Production: Uses the environment variables you set

4. **Public Path**: The webpack configs automatically set the correct `publicPath`:
   - Development: Explicit localhost URLs
   - Production: `auto` for remotes, `/` for host

## 🐛 Troubleshooting

### Issue: "Loading script failed" error

**Solution**: Ensure CORS headers are properly set in `vercel.json` and that the environment variables in the host app point to the correct URLs.

### Issue: Module Federation not working

**Solution**: 
1. Check that all apps are deployed and accessible
2. Verify environment variables are set correctly
3. Check browser console for specific error messages
4. Ensure `remoteEntry.js` is accessible at `https://your-app.vercel.app/remoteEntry.js`

### Issue: Build fails on Vercel

**Solution**:
1. Check that all dependencies are in `package.json`
2. Ensure `npm run build` works locally
3. Check Vercel build logs for specific errors

## 🎯 Quick Deploy Commands

```bash
# Deploy all apps in sequence
cd chat-app && vercel --prod && \
cd ../email-app && vercel --prod && \
cd ../host-app && vercel --prod
```

## 📊 Deployment Order

**Always deploy in this order:**
1. Chat App (remote)
2. Email App (remote)
3. Host App (shell)

This ensures the remote URLs are available when you configure the host app.

## 🔗 Useful Links

- Vercel Documentation: https://vercel.com/docs
- Webpack Module Federation: https://webpack.js.org/concepts/module-federation/
- Your Vercel Dashboard: https://vercel.com/dashboard
