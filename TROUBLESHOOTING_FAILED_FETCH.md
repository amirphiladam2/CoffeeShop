# Troubleshooting "Failed to Fetch" Error

If you're getting "Failed to fetch" errors, follow these steps in order:

## Quick Diagnostic Checklist

### 1. Check if Edge Function is Deployed ✅

**Most Common Issue**: The edge function isn't deployed!

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Look for `coffee-chat` function
3. If it's **NOT there**:
   - You need to deploy it (see Step 2 below)
4. If it **IS there**:
   - Check the **Logs** tab for any errors
   - Make sure it's in "Active" status

### 2. Deploy the Edge Function

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to Supabase Dashboard → **Edge Functions**
2. Click **"Create a new function"** (if function doesn't exist)
   - OR click on `coffee-chat` if it exists and click **"Edit"**
3. Copy ALL code from `supabase/functions/coffee-chat/index.ts` in your project
4. Paste into the Supabase editor
5. Click **"Deploy"** or **"Save"**

#### Option B: Using Supabase CLI

```bash
# Install CLI if needed
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF
# Find project ref: Dashboard → Settings → General → Reference ID

# Deploy the function
supabase functions deploy coffee-chat
```

### 3. Verify API Key is Set

1. Go to **Supabase Dashboard** → **Project Settings** → **Edge Functions** → **Secrets**
2. Check if `AI_API_KEY` is listed
3. If **NOT there**:
   - Click **"Add a new secret"**
   - Name: `AI_API_KEY`
   - Value: Your Google Gemini API key (starts with `AIza...`)
   - Click **Save**
4. Get your free Gemini API key: https://makersuite.google.com/app/apikey

### 4. Check Environment Variables in Production

If you're testing in production (Vercel, etc.):

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Make sure these are set:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon key
3. **Redeploy** after adding/changing variables

### 5. Check Browser Console

1. Open your app
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Try sending a chat message
5. Look for error messages - they'll tell you exactly what's wrong

### 6. Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try sending a chat message
4. Look for a request to `/functions/v1/coffee-chat`
5. Click on it to see:
   - **Status Code**: Should be 200 (success) or show the error
   - **Response**: Will show the actual error message
   - **Request URL**: Should be your Supabase URL + `/functions/v1/coffee-chat`

## Common Error Messages & Fixes

### "Failed to fetch" (Network Error)
**Cause**: Edge function not deployed or not accessible
**Fix**: Deploy the edge function (Step 2 above)

### "AI service not configured"
**Cause**: `AI_API_KEY` secret not set in Supabase
**Fix**: Set the secret (Step 3 above)

### "401 Unauthorized"
**Cause**: Invalid Supabase key or edge function auth issue
**Fix**: 
- Check `VITE_SUPABASE_PUBLISHABLE_KEY` is correct
- Check edge function allows anon access (should be default)

### "500 Internal Server Error"
**Cause**: Error in edge function code or API call
**Fix**: 
- Check Supabase Edge Functions → `coffee-chat` → Logs
- Look for specific error message
- Usually means invalid Gemini API key or API error

### "400 Bad Request"
**Cause**: Invalid API request format
**Fix**: Check edge function logs for details

## Testing Steps

### Test 1: Check Edge Function Exists
- Go to Supabase Dashboard → Edge Functions
- Should see `coffee-chat` function listed
- ✅ If yes → Continue to Test 2
- ❌ If no → Deploy it (Step 2)

### Test 2: Check API Key Secret
- Go to Supabase Dashboard → Project Settings → Edge Functions → Secrets
- Should see `AI_API_KEY` in the list
- ✅ If yes → Continue to Test 3
- ❌ If no → Add it (Step 3)

### Test 3: Check Function Logs
- Go to Supabase Dashboard → Edge Functions → `coffee-chat` → Logs
- Try sending a chat message
- Look at the logs:
  - ✅ "Calling Google Gemini API..." → Good, function is running
  - ✅ "Successfully got AI response" → Working!
  - ❌ "AI_API_KEY is not configured" → Need to set secret
  - ❌ "Gemini API error" → Check API key validity

### Test 4: Test Function Directly
1. Go to Supabase Dashboard → Edge Functions → `coffee-chat`
2. Click **"Test"** or **"Invoke"**
3. Use this test payload:
```json
{
  "message": "Hello",
  "conversationHistory": []
}
```
4. Check the response:
   - ✅ Should return `{"response": "..."}`
   - ❌ If error, check the error message

## Still Not Working?

If you've tried all the above:

1. **Check Supabase Status**: https://status.supabase.com/
2. **Check Gemini API Status**: https://status.cloud.google.com/
3. **Verify API Key**: Test your Gemini API key at https://aistudio.google.com/
4. **Check Edge Function Code**: Make sure the code in Supabase matches `supabase/functions/coffee-chat/index.ts`
5. **Clear Browser Cache**: Sometimes old code is cached

## Quick Verification Commands

If using Supabase CLI:

```bash
# Check if function is deployed
supabase functions list

# Check secrets
supabase secrets list

# View logs
supabase functions logs coffee-chat
```

## Need More Help?

1. Check `CHATBOT_DEPLOYMENT.md` for deployment steps
2. Check `FREE_AI_SETUP.md` for API key setup
3. Check browser console (F12) for detailed errors
4. Check Supabase Edge Function logs for server-side errors

---

**Most likely issue**: Edge function not deployed! Make sure you deployed it to Supabase.

