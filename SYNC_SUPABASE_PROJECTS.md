# Sync Supabase Projects - Use Same Project for Both

## Found Your Localhost Supabase Credentials! ✅

From your `.env.local` file:

```
VITE_SUPABASE_URL="https://eoryyqttzktnwjpzdwef.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcnl5cXR0emt0bndqcHpkd2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODg0NzgsImV4cCI6MjA3NzU2NDQ3OH0.OP2csNRmtplP3F5fPhiA_Ouq0EN2ypDG3eOrW5kJtyY"
```

**This Supabase project has the edge function deployed and working! ✅**

## Quick Fix: Update Vercel to Use Same Supabase

### Step 1: Copy These Values

**Supabase URL:**
```
https://eoryyqttzktnwjpzdwef.supabase.co
```

**Supabase Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcnl5cXR0emt0bndqcHpkd2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODg0NzgsImV4cCI6MjA3NzU2NDQ3OH0.OP2csNRmtplP3F5fPhiA_Ouq0EN2ypDG3eOrW5kJtyY
```

### Step 2: Update Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Find `VITE_SUPABASE_URL`:
   - Click **Edit** or delete and recreate
   - Value: `https://eoryyqttzktnwjpzdwef.supabase.co`
   - Environments: Select **Production**, **Preview**, **Development**
   - Click **Save**

3. Find `VITE_SUPABASE_PUBLISHABLE_KEY`:
   - Click **Edit** or delete and recreate
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcnl5cXR0emt0bndqcHpkd2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODg0NzgsImV4cCI6MjA3NzU2NDQ3OH0.OP2csNRmtplP3F5fPhiA_Ouq0EN2ypDG3eOrW5kJtyY`
   - Environments: Select **Production**, **Preview**, **Development**
   - Click **Save**

### Step 3: Redeploy

1. Go to **Vercel Dashboard** → **Deployments**
2. Click **"..."** on latest deployment → **Redeploy**
3. Wait 2-3 minutes for deployment

### Step 4: Test

1. Go to your production site
2. Hard refresh: `Ctrl + Shift + R`
3. Go to `/chat` page
4. The diagnostic should now show ✅ (or not show if chat works)
5. Try sending a message - should work! 🎉

## Why This Works

- ✅ **Localhost** uses: `eoryyqttzktnwjpzdwef.supabase.co` (has edge function)
- ❌ **Production** uses: Different Supabase (missing edge function)
- ✅ **After update**: Both will use same Supabase (edge function works!)

## Verify It Worked

After redeploying, in production browser console (F12):
```javascript
console.log('Production Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
// Should show: https://eoryyqttzktnwjpzdwef.supabase.co
```

If it matches → ✅ **Success!** Production is now using the working Supabase project!

