# New Vercel Deployment Setup Checklist

After creating a fresh Vercel deployment, follow these steps to get everything working.

## Step 1: Set Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Where to find these:**
- Supabase Dashboard → Your Project → Settings → API
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

4. **Redeploy** after adding variables:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **Redeploy**

## Step 2: Deploy Edge Function to Supabase

The chat bot requires a Supabase Edge Function. Deploy it:

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy the function
supabase functions deploy coffee-chat
```

### Option B: Using Supabase Dashboard

1. Go to **Supabase Dashboard** → Your Project
2. Click **Edge Functions** in left sidebar
3. Click **"Create a new function"**
4. Name it: `coffee-chat`
5. Copy the code from `supabase/functions/coffee-chat/index.ts`
6. Paste it into the editor
7. Click **Deploy**

## Step 3: Set AI API Key in Supabase

The chat bot needs an AI API key (Google Gemini):

1. **Get a Gemini API Key:**
   - Go to https://makersuite.google.com/app/apikey
   - Create a free API key

2. **Add to Supabase Secrets:**
   - Go to **Supabase Dashboard** → Your Project
   - Click **Edge Functions** → **Secrets**
   - Click **Add Secret**
   - Name: `AI_API_KEY`
   - Value: Your Gemini API key
   - Click **Save**

## Step 4: Add Admin Role (If Needed)

If you need admin access:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run:
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 5: Clear All Caches

### Browser Cache
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Or clear browser cache completely:
   - Chrome: Settings → Privacy → Clear browsing data
   - Clear "Cached images and files"

### Vercel Cache
1. Go to **Vercel Dashboard** → **Deployments**
2. Click **"..."** on latest → **Redeploy**
3. Wait for deployment to complete

## Step 6: Verify Everything Works

### ✅ Test Chat Bot
1. Sign in to your app
2. Go to `/chat`
3. Send a message
4. Check browser console (F12) for any errors

**If bot doesn't work, check:**
- Edge function is deployed (Supabase → Edge Functions → coffee-chat)
- AI_API_KEY is set in Supabase secrets
- Environment variables are set in Vercel

### ✅ Test Admin Access
1. Check if admin button appears in navigation
2. Check browser console for admin status
3. Go to `/profile` to see admin card

### ✅ Test Database Connection
1. Go to `/shop` - should show coffees
2. Try adding to cart
3. Check if data loads

## Troubleshooting

### "Old items showing"
- **Cause**: Browser cache or Vercel cache
- **Fix**: Clear browser cache (Ctrl+Shift+R) and redeploy on Vercel

### "Bot not working"
**Check:**
1. Edge function deployed? → Supabase → Edge Functions
2. AI_API_KEY set? → Supabase → Edge Functions → Secrets
3. Environment variables set? → Vercel → Settings → Environment Variables
4. Check browser console for errors

### "Can't connect to Supabase"
**Check:**
1. Environment variables in Vercel match Supabase project
2. Supabase project is active (not paused)
3. Network/firewall issues

## Quick Verification Commands

### In Browser Console (F12):
```javascript
// Check Supabase connection
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

// Check if edge function exists
fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coffee-chat`, {
  method: 'OPTIONS'
}).then(r => console.log("Edge function reachable:", r.ok));
```

### In Vercel:
- Settings → Environment Variables → Verify all are set
- Deployments → Latest → Check build logs for errors

