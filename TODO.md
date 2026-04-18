# Fix CORS/413 + Feed Card UX ✅

## Backend Fixes COMPLETE ✅
### [✅] vercel.json: 25MB payload limit
### [✅] app.js: Secure CORS  
### [✅] multer.js: 10MB files

## New: Feed Card Content Truncation ✅
### [✅] PostCard.jsx: content.slice(0,100) + "..."

## DEPLOY
```
cd backend && vercel --prod
```
**Windows CMD:** `cd backend & vercel --prod`

## Test
1. Redeploy backend (fixes CORS/413)
2. Check Home/Feed - long content truncated
