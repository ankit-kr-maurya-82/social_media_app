# Fix Vercel Build Error: Remove invalid bodyParser property

## Steps:
- [x] 1. Edit `backend/vercel.json`: Remove `bodyParser` from functions config
- [x] 2. Edit `backend/src/app.js`: Add `limit: '25mb'` to express.json() and express.urlencoded()
- [ ] 3. Test deployment with `vercel deploy` or git push
- [ ] 4. Verify large payload uploads work (posts/images)

**✅ Core fixes complete! Now run `vercel deploy` in backend/ to test.**
