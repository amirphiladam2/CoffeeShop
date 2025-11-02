# Managing Multiple Vercel Deployments

If you have **two different Vercel deployments**, here's how to manage them properly.

## Step 1: Identify Your Deployments

1. Go to https://vercel.com/dashboard
2. You should see your project(s) listed
3. Check if you have:
   - Multiple projects (e.g., `coffee-ai-brew`, `coffee-ai-brew-staging`)
   - OR one project with multiple deployments

## Common Scenarios

### Scenario A: Two Separate Projects

**Example:**
- `coffee-ai-brew` (production)
- `coffee-ai-brew-staging` (staging/test)

**Solution:**
- **Option 1**: Delete one (recommended if you don't need staging)
- **Option 2**: Keep both but ensure they're clearly labeled
- **Option 3**: Use Vercel preview deployments instead

### Scenario B: One Project, Multiple Domains

**Example:**
- `havenbrew.vercel.app` (default)
- `coffee-app.vercel.app` (custom domain)

**Solution:**
- They're the same deployment, just different URLs
- Use Vercel → Project → Settings → Domains to manage

### Scenario C: Multiple Branches Deployed

**Example:**
- `main` branch → production
- `develop` branch → staging

**Solution:**
- This is normal for branch deployments
- Each branch has its own environment variables
- Sync admin roles in the Supabase project each uses

## Step 2: Check Environment Variables for Each

For EACH Vercel deployment:

1. Go to Vercel Dashboard
2. Select the project/deployment
3. Go to **Settings** → **Environment Variables**
4. Check:
   - `VITE_SUPABASE_URL` - Which Supabase project?
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Which API key?

**Write down the values for each deployment.**

## Step 3: Compare Supabase Projects

### If Both Use SAME Supabase Project:
✅ **Good!** Admin role in database works for both
- Just make sure admin role is added once
- Both deployments will detect it

### If Both Use DIFFERENT Supabase Projects:
⚠️ **You need to add admin role in BOTH databases**

For EACH Supabase project, run:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('bbb3ac9c-6b63-4672-854e-f47b61e2302d', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 4: Recommended Action

### Option 1: Consolidate to One Deployment (Recommended)

1. **Identify which deployment you want to keep**
   - Usually the one with custom domain or production URL
   
2. **Update the other deployment to use SAME Supabase project**
   - Copy environment variables from the working one
   - OR delete the duplicate deployment

3. **Benefits:**
   - One source of truth
   - Easier to manage
   - Admin role works everywhere

### Option 2: Keep Both but Sync Configuration

1. **Use the SAME Supabase project for both**
   - Copy `VITE_SUPABASE_URL` from one to the other
   - Copy `VITE_SUPABASE_PUBLISHABLE_KEY` from one to the other
   - Redeploy both

2. **Add admin role in the shared Supabase database** (only once)

3. **Label them clearly:**
   - Add project description in Vercel
   - Use different custom domains if needed

## Step 5: Verify Each Deployment

For EACH Vercel deployment URL:

1. Visit the URL
2. Sign in
3. Check browser console (F12)
4. Look for: `🔍 Admin Status`
5. Check if admin button appears

## Quick Fix: Sync Both Deployments

### 1. Find Your Deployment URLs
- Check Vercel dashboard
- Note both URLs (e.g., `app1.vercel.app` and `app2.vercel.app`)

### 2. Check Supabase Projects
For each deployment, check which Supabase project it uses

### 3. Choose Your Strategy:

**A) Same Supabase Project (Easiest)**
```bash
# In Vercel Dashboard → Settings → Environment Variables
# Copy VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
# from working deployment to the other one
# Then redeploy both
```

**B) Different Supabase Projects (More Work)**
```sql
-- Run this in BOTH Supabase projects (SQL Editor)
INSERT INTO public.user_roles (user_id, role)
VALUES ('bbb3ac9c-6b63-4672-854e-f47b61e2302d', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;
```

## Troubleshooting Checklist

- [ ] Both deployments checked in Vercel dashboard
- [ ] Environment variables compared for both
- [ ] Supabase projects identified (same or different?)
- [ ] Admin role added in correct Supabase project(s)
- [ ] Both deployments redeployed after changes
- [ ] Browser cache cleared (Ctrl+Shift+R)
- [ ] Signed out and back in on both deployments

## Next Steps

1. **Tell me:**
   - What are the two Vercel deployment URLs?
   - Which one works? Which one doesn't?
   - Do they use the same Supabase project?

2. **I'll help you:**
   - Sync the configuration
   - Fix the admin access
   - Consolidate if needed

