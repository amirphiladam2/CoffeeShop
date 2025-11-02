# Fresh Supabase Setup - Complete Guide

After creating your new Supabase project, follow these steps:

## Step 1: Create Database Tables

1. Go to **Supabase Dashboard** → Your New Project
2. Click **SQL Editor** (left sidebar)
3. Open `FRESH_SETUP.sql` file from this repo
4. Copy **ALL** the SQL code
5. Paste into SQL Editor
6. Click **Run** or press `Ctrl+Enter`
7. Should see: "Success. No rows returned" ✅

## Step 2: Get Your Supabase Credentials

1. In **Supabase Dashboard** → Your Project
2. Go to **Settings** → **API**
3. Copy these:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOi...` (long JWT token)

## Step 3: Set Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project
2. **Settings** → **Environment Variables**
3. Add/Update:
   - `VITE_SUPABASE_URL` = Your Project URL from Step 2
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your anon key from Step 2
4. **Select all environments** (Production, Preview, Development)
5. **Save**
6. **Redeploy** (Deployments → Latest → Redeploy)

## Step 4: Update Local .env.local File

Create/update `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi... (your anon key)
```

Then restart: `npm run dev`

## Step 5: Deploy Edge Function for Chatbot

1. **Supabase Dashboard** → Your Project → **Edge Functions**
2. Click **"Create a new function"** or **"Deploy function"**
3. Name it: `coffee-chat`
4. Copy **ALL** code from `supabase/functions/coffee-chat/index.ts`
5. Paste into code editor
6. Click **"Deploy"** or **"Save"**

## Step 6: Set AI_API_KEY Secret

1. Still in **Edge Functions** section
2. Click **Secrets** tab
3. Click **Add Secret**
4. Name: `AI_API_KEY`
5. Value: Your Google Gemini API key
   - Get from: https://makersuite.google.com/app/apikey
6. Click **Save**

## Step 7: Add Admin Role for Your User

1. **Supabase Dashboard** → **SQL Editor**
2. Run this (replace with your email):
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```
3. Sign out and sign back in to your app
4. Admin button should appear! ✅

## Step 8: Test Everything

1. **Test Chat:**
   - Go to `/chat`
   - Send a message
   - Should work! ✅

2. **Test Admin:**
   - Go to `/admin`
   - Should see admin dashboard ✅
   - Try adding a coffee item ✅

3. **Test Shop:**
   - Go to `/shop`
   - Should see coffee products ✅

## Quick Checklist

- [ ] Database tables created (ran FRESH_SETUP.sql)
- [ ] Supabase credentials copied
- [ ] Vercel environment variables set
- [ ] Local .env.local file updated
- [ ] Edge function `coffee-chat` deployed
- [ ] AI_API_KEY secret added
- [ ] Admin role added for your user
- [ ] Signed out and signed back in
- [ ] Chat works ✅
- [ ] Admin panel accessible ✅

## If Something Doesn't Work

**Chat not working:**
- Check edge function is deployed (Step 5)
- Check AI_API_KEY is set (Step 6)
- Check Vercel env vars match Supabase (Step 3)

**Admin not working:**
- Check admin role exists: Run SQL from Step 7
- Sign out and back in
- Check browser console for admin status

**Tables missing:**
- Re-run FRESH_SETUP.sql
- Check SQL Editor for errors

