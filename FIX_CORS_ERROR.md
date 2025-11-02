# Fix CORS Error - Edge Function Not Deployed

## The Problem
```
Access to fetch at 'https://...supabase.co/functions/v1/coffee-chat' from origin '...' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
It does not have HTTP ok status.
```

**This means the edge function `coffee-chat` is NOT deployed in your Supabase project.**

## Quick Fix (5 minutes)

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select your project (the one with URL `ergvqpdzoyfteribjtyw.supabase.co`)

### Step 2: Check if Function Exists
1. Click **"Edge Functions"** in the left sidebar
2. Look for `coffee-chat` function
3. If it's NOT there → Continue to Step 3
4. If it IS there → Skip to Step 4

### Step 3: Deploy the Function
1. In **Edge Functions** page, click **"Create a new function"** or **"Deploy function"**
2. Name it exactly: `coffee-chat`
3. Copy the ENTIRE code from `supabase/functions/coffee-chat/index.ts` in this repository
4. Paste it into the code editor
5. Click **"Deploy"** or **"Save"**

### Step 4: Verify AI_API_KEY Secret
1. Still in **Edge Functions** section
2. Click the **"Secrets"** tab (or go to **Project Settings** → **Secrets**)
3. Check if `AI_API_KEY` exists
4. If missing:
   - Click **"Add Secret"** or **"New Secret"**
   - Name: `AI_API_KEY`
   - Value: Your Google Gemini API key
     - Get it from: https://makersuite.google.com/app/apikey
   - Click **"Save"**

### Step 5: Test It
1. In **Edge Functions** → `coffee-chat`
2. Click **"Invoke"** or **"Test"**
3. Send this JSON:
```json
{
  "message": "Hello",
  "conversationHistory": []
}
```
4. If you get a response → ✅ It works!
5. If you get an error → Check the logs tab for details

### Step 6: Test in Your App
1. Go back to your app (https://havenbrew.vercel.app)
2. Open `/chat` page
3. Send a message
4. Should work now! 🎉

## Alternative: Deploy via CLI

If you prefer command line:

```bash
# 1. Install Supabase CLI (if not installed)
npm install -g supabase

# 2. Login
supabase login

# 3. Link to your project
# Get project-ref from Supabase Dashboard → Settings → General → Reference ID
supabase link --project-ref ergvqpdzoyfteribjtyw

# 4. Deploy the function
supabase functions deploy coffee-chat

# 5. Set the AI key secret
supabase secrets set AI_API_KEY=your-gemini-api-key-here
```

## Why This Happened

When you deleted and recreated Vercel projects, the **frontend code** was redeployed, but the **Supabase edge function** was not. Edge functions are deployed separately to Supabase, not automatically with your Vercel deployment.

## Verify It's Working

After deploying, test in browser console:

```javascript
// On your deployed site, open console (F12) and run:
const SUPABASE_URL = 'https://ergvqpdzoyfteribjtyw.supabase.co';
const SUPABASE_KEY = 'your-anon-key'; // Get from Supabase Dashboard → Settings → API

fetch(`${SUPABASE_URL}/functions/v1/coffee-chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'apikey': SUPABASE_KEY
  },
  body: JSON.stringify({
    message: "Hello",
    conversationHistory: []
  })
})
.then(r => r.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

If you see a response, it's working! 🎉

