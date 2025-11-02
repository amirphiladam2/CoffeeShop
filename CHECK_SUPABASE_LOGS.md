# How to Check Supabase Edge Function Logs

## Quick Steps to See the Exact Error

1. **Go to Supabase Dashboard**
   - Open https://supabase.com/dashboard
   - Select your project

2. **Navigate to Edge Functions**
   - Click **"Edge Functions"** in the left sidebar
   - Click on **"coffee-chat"** function

3. **Open the Logs Tab**
   - Click the **"Logs"** tab at the top
   - You'll see real-time logs from the function

4. **Trigger the Error**
   - Go to your app's `/chat` page
   - Send a message
   - Go back to the Supabase logs tab
   - You should see the error appear in the logs

## What to Look For

### Common Errors You'll See:

#### 1. "AI_API_KEY is not configured"
```
AI_API_KEY is not configured
```
**Fix:** Add the `AI_API_KEY` secret in Edge Functions → Secrets

#### 2. Gemini API Errors
```
Gemini API error: 400 [invalid API key message]
Gemini API error: 429 [rate limit]
```
**Fix:** Check your Gemini API key is valid and not rate-limited

#### 3. JSON Parse Errors
```
Error parsing request body
```
**Fix:** Check the request format (should have `message` and `conversationHistory`)

#### 4. Network Errors
```
Failed to fetch Gemini API
```
**Fix:** Check internet connectivity or API endpoint

## Screenshot Guide

```
Supabase Dashboard
├── Your Project
│   ├── Edge Functions (left sidebar)
│   │   ├── coffee-chat
│   │   │   ├── Overview tab
│   │   │   ├── Logs tab ← CLICK HERE
│   │   │   ├── Secrets tab
│   │   │   └── Settings tab
```

## Reading the Logs

- **Green logs** = Successful requests
- **Red logs** = Errors
- **Timestamp** = When the error occurred
- **Message** = The actual error text

Look for:
- `console.error()` messages (these show errors)
- `console.log()` messages (these show info)

## Export Logs

If you need to share logs:
1. In the Logs tab, you can copy the error text
2. Or take a screenshot
3. The logs show the exact line where the error occurred

## Quick Fix Checklist Based on Logs

**If you see "AI_API_KEY is not configured":**
- [ ] Go to Edge Functions → Secrets
- [ ] Add `AI_API_KEY` with your Gemini API key
- [ ] Get key from: https://makersuite.google.com/app/apikey

**If you see Gemini API errors (400/401):**
- [ ] Verify your API key is correct
- [ ] Check key hasn't expired
- [ ] Get a new key if needed

**If you see rate limit (429):**
- [ ] Wait a few minutes
- [ ] Check your Gemini API quota

**If you see other errors:**
- [ ] Check the exact error message
- [ ] Compare your function code with `supabase/functions/coffee-chat/index.ts`
- [ ] Re-deploy the function with correct code

