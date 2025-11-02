# Chat Bot Troubleshooting Guide

If your chat bot is not working, follow these steps to diagnose and fix the issue.

## ✅ Step 1: Verify Edge Function is Deployed

1. Go to your **Supabase Dashboard** → **Edge Functions**
2. Check if `coffee-chat` function exists
3. If it doesn't exist:
   - Click "Deploy function" or "Create function"
   - Name it `coffee-chat`
   - Copy the code from `supabase/functions/coffee-chat/index.ts`
   - Deploy it

**OR** deploy via CLI:
```bash
supabase functions deploy coffee-chat
```

## ✅ Step 2: Verify AI_API_KEY is Set in Supabase

1. Go to **Supabase Dashboard** → **Edge Functions** → **Secrets** (or **Project Settings** → **Secrets**)
2. Check if `AI_API_KEY` exists
3. If it doesn't exist:
   - Click "Add new secret"
   - Name: `AI_API_KEY`
   - Value: Your Google Gemini API key (get from https://makersuite.google.com/app/apikey)
   - Click "Save"

**OR** set via CLI:
```bash
supabase secrets set AI_API_KEY=your_api_key_here
```

## ✅ Step 3: Verify Supabase Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these are set correctly:
   - `VITE_SUPABASE_URL` - Your Supabase project URL (ends with `.supabase.co`)
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon/public key

3. To get the correct values:
   - Go to **Supabase Dashboard** → **Settings** → **API**
   - Copy **Project URL** → Use for `VITE_SUPABASE_URL`
   - Copy **anon public** key → Use for `VITE_SUPABASE_PUBLISHABLE_KEY`

4. After setting variables, **redeploy** your Vercel project

## ✅ Step 4: Test the Edge Function Directly

Test if the edge function works by calling it directly:

### Option A: Via Supabase Dashboard
1. Go to **Supabase Dashboard** → **Edge Functions** → `coffee-chat`
2. Click "Invoke function" or "Test"
3. Send this JSON:
```json
{
  "message": "Hello",
  "conversationHistory": []
}
```
4. Check if you get a response

### Option B: Via Browser Console (on your deployed site)
1. Open your deployed site
2. Open browser console (F12)
3. Run this:
```javascript
fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coffee-chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
  },
  body: JSON.stringify({
    message: "Hello",
    conversationHistory: []
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### Option C: Via curl
```bash
curl -X POST \
  "YOUR_SUPABASE_URL/functions/v1/coffee-chat" \
  -H "Authorization: Bearer YOUR_SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "conversationHistory": []}'
```

## 🔍 Common Error Messages & Solutions

### "Network error: Failed to fetch"
**Cause:** Edge function not deployed or not accessible  
**Fix:** Deploy the edge function (Step 1)

### "AI service not configured. Please set AI_API_KEY"
**Cause:** AI_API_KEY secret not set in Supabase  
**Fix:** Set the secret (Step 2)

### "Failed to get response from AI (Status: 400)"
**Cause:** Invalid API key or malformed request  
**Fix:** 
- Verify your Gemini API key is valid at https://makersuite.google.com/app/apikey
- Check edge function logs in Supabase Dashboard

### "Failed to get response from AI (Status: 429)"
**Cause:** Rate limit exceeded  
**Fix:** Wait a few minutes and try again, or upgrade your Gemini API quota

### "Supabase configuration missing"
**Cause:** Environment variables not set in Vercel  
**Fix:** Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (Step 3)

### Old items showing / Wrong data
**Cause:** Using wrong Supabase project or cached data  
**Fix:** 
- Verify you're using the correct Supabase URL in Vercel
- Clear browser cache (Ctrl+Shift+R or Incognito mode)

## 🚀 Quick Fix Checklist

- [ ] Edge function `coffee-chat` exists in Supabase
- [ ] `AI_API_KEY` secret is set in Supabase
- [ ] `VITE_SUPABASE_URL` is set in Vercel (matches Supabase Dashboard → Settings → API → Project URL)
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` is set in Vercel (matches Supabase Dashboard → Settings → API → anon public key)
- [ ] Vercel deployment has been redeployed after setting environment variables
- [ ] Browser cache cleared / Using incognito mode

## 📝 Debugging Tips

1. **Check Browser Console**: Open DevTools (F12) → Console tab → Look for errors when sending a message
2. **Check Network Tab**: Open DevTools → Network tab → Look for failed requests to `/functions/v1/coffee-chat`
3. **Check Supabase Logs**: Supabase Dashboard → Edge Functions → `coffee-chat` → Logs tab
4. **Check Vercel Logs**: Vercel Dashboard → Your Deployment → Functions → View logs

## 🔗 Useful Links

- Get Gemini API Key: https://makersuite.google.com/app/apikey
- Supabase Edge Functions Docs: https://supabase.com/docs/guides/functions
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

