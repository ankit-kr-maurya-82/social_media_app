# Fix CORS and 413 Payload Too Large Errors

## Backend Fixes ✅ COMPLETE

### [✅] 1. Update backend/vercel.json
   - Added functions config: maxDuration 30s, bodyParser sizeLimit 25mb

### [✅] 2. Update backend/src/app.js
   - Fixed CORS origin function to validate against allowedOrigins

### [✅] 3. Update backend/src/middlewares/multer.middleware.js
   - Reduced fileSize limit to 10MB

## Next Steps

### [ ] 4. **Redeploy backend** 
   ```
   cd backend
   vercel --prod
   ```

### [ ] 5. **Test** CreatePost with ~5-10MB image file

## Expected Results
- ❌ No more CORS errors 
- ❌ No more 413 Payload Too Large
- ✅ Posts create with media uploaded to Cloudinary

**Redeploy now to apply fixes!**
