# Free AI Setup Guide - Google Gemini

The chatbot now uses **Google Gemini** which has a **completely FREE tier**! 🎉

## Why Google Gemini?

✅ **100% FREE** (generous free tier)
✅ **No credit card required** for free tier
✅ **60 requests per minute** (free tier)
✅ **1.5 million requests per day** (free tier)
✅ **High quality responses**
✅ **Easy to set up**

## Step 1: Get Your Free Gemini API Key

1. **Go to Google AI Studio**:
   - Visit: https://makersuite.google.com/app/apikey
   - OR: https://aistudio.google.com/app/apikey

2. **Sign in with Google**:
   - Use your Google account (Gmail, etc.)

3. **Create API Key**:
   - Click **"Create API Key"**
   - Select or create a Google Cloud project (can use default)
   - Click **"Create API Key"**
   - **Copy the key immediately** (looks like: `AIza...`)

4. **That's it!** No billing, no credit card needed for free tier! 🎊

## Step 2: Set the API Key in Supabase

1. Go to **Supabase Dashboard** → **Project Settings** → **Edge Functions** → **Secrets**
2. Click **"Add a new secret"**
3. Name: `AI_API_KEY`
4. Value: (paste your Gemini API key - the `AIza...` key)
5. Click **Save**

## Step 3: Deploy the Edge Function

The code has already been updated to use Gemini! Just deploy it:

### Option A: Using Supabase CLI
```bash
supabase functions deploy coffee-chat
```

### Option B: Using Supabase Dashboard
1. Go to Supabase Dashboard → **Edge Functions**
2. Find `coffee-chat` function
3. Copy the updated code from `supabase/functions/coffee-chat/index.ts`
4. Paste and click **Deploy**

## Free Tier Limits

With Google Gemini free tier, you get:
- **60 requests per minute** (perfect for chat!)
- **1,500 requests per day** (plenty for most apps)
- **No cost** - completely free!

If you need more:
- Check Google's pricing (very affordable if needed)
- Or use multiple API keys for different environments

## Cost Comparison

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| **Google Gemini** ✅ | **60/min, 1.5M/day** | $0.000125 per 1K chars |
| OpenAI GPT-3.5 | $5 credits (one-time) | $0.002 per 1K tokens |
| OpenAI GPT-4 | $5 credits (one-time) | $0.03 per 1K tokens |

**Gemini is the best free option!** 🎉

## Troubleshooting

### "Invalid API key" Error
- Make sure you copied the full key (starts with `AIza...`)
- Check that the key is set correctly in Supabase secrets
- Verify the key is active in Google AI Studio

### "Rate limit exceeded"
- Free tier allows 60 requests per minute
- Wait a moment and try again
- For production, you may want to implement rate limiting on your side

### "Quota exceeded"
- Free tier has daily limits
- Check your usage in Google AI Studio
- Wait until the next day or upgrade if needed

## Verify Your Setup

1. **Check API Key is Active**:
   - Go to https://makersuite.google.com/app/apikey
   - See your key listed there

2. **Test in Supabase**:
   - Go to Supabase Dashboard → Edge Functions → `coffee-chat` → Logs
   - Send a test message from your app
   - Check logs for any errors

3. **Test in Your App**:
   - Go to Chat page
   - Send a message
   - Should get a response from Venessa! ☕

## Need Help?

- **Google AI Studio**: https://aistudio.google.com/
- **Gemini API Docs**: https://ai.google.dev/docs
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

---

**Remember**: Keep your API key secure! Never commit it to Git.

