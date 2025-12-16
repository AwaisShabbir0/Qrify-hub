# Deployment Instructions - QRify Hub

This project is a static React application built with Vite. It can be easily deployed to platforms like Netlify and Vercel.

## Build Requirements

- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 1. Deploy to Netlify

### Option A: Drag & Drop (Easiest)
1. Run `npm run build` locally.
2. Login to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the upload area.
   > **IMPORTANT:** Do NOT drag the whole project folder. You must open the project folder, locate the `dist` folder (created after running `npm run build`), and drag ONLY that folder.
4. Your site is live!

### Option B: Git Integration (Recommended)`
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Login to Netlify and click "Add new site" > "Import from Git".
3. Authorize and select your repository.
4. Verify the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site".

## 2. Deploy to Vercel

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Login to [Vercel](https://vercel.com) and click "Add New..." > "Project".
3. Import your repository.
4. Vercel automatically detects Vite. Verify settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy".

## Important Notes for Camera Access

For the QR Scanner to work on mobile devices, **the site must be served over HTTPS**. Both Netlify and Vercel provide free SSL (HTTPS) automatically for all deployments.

If testing locally on a phone, you cannot access the camera via `http://YOUR_PC_IP:5173`. You must use localhost on the device itself or setup a secure tunnel (like `ngrok`).
