# Fix: Edge Function Not Deployed in Production

## The Problem
- ✅ **Localhost**: Chat works (edge function is deployed)
- ❌ **Production**: Diagnostic shows "Edge function 'coffee-chat' is NOT deployed"

This means **production Vercel** is using a **different Supabase project** that doesn't have the edge function deployed.

## Step 1: Verify Which Supabase Project Production Uses

**Check Vercel Environment Variables:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find `VITE_SUPABASE_URL`
3. Copy the URL (looks like: `https://xxxxx.supabase.co`)
4. Note the project ID from the URL

**Check Local Environment Variables:**
1. Look in your local `.env` file (or `src/integrations/supabase/client.ts`)
2. Check your local `VITE_SUPABASE_URL`
3. Compare with production - **are they different?**

## Step 2: Deploy Edge Function to Production Supabase

**Option A: If Production Uses Different Supabase Project**

1. Go to **Supabase Dashboard** → Select the project that matches your production URL
2. Click **Edge Functions** in left sidebar
3. Check if `coffee-chat` exists:
   - If **missing** → Continue to Step 3
   - If **exists** → Skip to Step 4

**Option B: Use Same Supabase Project for Both**

1. Go to **Vercel Dashboard** → Settings → Environment Variables
2. Update `VITE_SUPABASE_URL` to match your localhost Supabase URL
3. Update `VITE_SUPABASE_PUBLISHABLE_KEY` to match your localhost key
4. Redeploy on Vercel

## Step 3: Deploy Edge Function

1. Go to **Supabase Dashboard** → Your Production Project → **Edge Functions**
2. Click **"Create a new function"** or **"Deploy function"**
3. Name it exactly: `coffee-chat`
4. Copy the code from `supabase/functions/coffee-chat/index.ts` in your repo
5. Paste into the code editor
6. Click **"Deploy"** or **"Save"**

## Step 4: Verify AI_API_KEY Secret

1. Still in **Edge Functions** section
2. Click **Secrets** tab
3. Check if `AI_API_KEY` exists:
   - If **missing** → Click "Add Secret"
   - Name: `AI_API_KEY`
   - Value: Your Gemini API key (get from https://makersuite.google.com/app/apikey)
   - Click **Save**

## Step 5: Test in Production

1. Go to your production site
2. Hard refresh: `Ctrl + Shift + R`
3. Go to `/chat` page
4. The diagnostic should now show ✅ (success) instead of ❌
5. Try sending a message - it should work!

## Quick Verification

**Check which Supabase project you're using:**
```javascript
// In browser console on production site (F12):
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

// Compare with your local .env file
```

**If they're different:**
- You have two Supabase projects
- Local uses one (has edge function ✅)
- Production uses another (missing edge function ❌)
- **Solution**: Deploy edge function to production Supabase project

## Most Common Scenario

You likely have:
- **Local Supabase**: Has edge function deployed ✅
- **Production Supabase**: Missing edge function ❌

**Fix**: Deploy the edge function to your **production Supabase project** using the steps above.

