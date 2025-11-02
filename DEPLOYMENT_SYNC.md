# Deployment Sync Guide

If you have two deployments (local dev + production) working differently, follow this guide to sync them.

## Common Issues

### 1. Different Supabase Projects
- **Local**: Uses `.env` file with one Supabase project
- **Vercel**: Uses environment variables with a different Supabase project

**Fix**: Make sure both use the SAME Supabase project

### 2. Different Environment Variables

**Local Setup** (`.env` file - create if missing):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Vercel Setup**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = Same as local
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = Same as local

### 3. Different Database States

**Check Admin Role in Supabase**:
```sql
-- Run in Supabase SQL Editor (for BOTH projects if you have two)
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

**If you have TWO Supabase projects**:
- You need to add admin role in BOTH databases
- Or consolidate to ONE Supabase project

## Quick Sync Checklist

### ✅ Step 1: Verify Supabase Projects

**Local** (check `.env` or environment):
```bash
# In your terminal, check what Supabase URL is being used
echo $VITE_SUPABASE_URL
```

**Vercel** (check dashboard):
1. Go to Vercel → Project → Settings → Environment Variables
2. Check `VITE_SUPABASE_URL` value

**Action**: They should match! If not, decide which Supabase project to use.

### ✅ Step 2: Sync Environment Variables

**Option A: Use Same Supabase Project (Recommended)**
1. Copy values from local `.env`
2. Set same values in Vercel Environment Variables
3. Redeploy on Vercel

**Option B: Use Different Projects**
- You'll need to manage admin roles in BOTH projects
- Keep them in sync manually

### ✅ Step 3: Sync Database Admin Roles

If using **same Supabase project**:
- Admin role in database works for both deployments ✅

If using **different Supabase projects**:
- Add admin role in BOTH databases:
  ```sql
  -- For EACH Supabase project, run:
  INSERT INTO public.user_roles (user_id, role)
  VALUES ('bbb3ac9c-6b63-4672-854e-f47b61e2302d', 'admin'::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  ```

### ✅ Step 4: Clear Caches

**Local**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear browser cache (Ctrl+Shift+Delete)
```

**Vercel**:
- Go to Deployments → Click "..." on latest → Redeploy
- Or just push a new commit to trigger redeploy

## Testing Both Environments

### Local (http://localhost:8080)
1. Check browser console for admin status
2. Check if admin button appears
3. Test sign out

### Production (https://havenbrew.vercel.app)
1. Check browser console for admin status  
2. Check if admin button appears
3. Test sign out
4. Hard refresh (Ctrl+Shift+R) to clear cache

## Troubleshooting

### Issue: Admin works locally but not in production
**Cause**: Different Supabase projects or missing admin role in production database
**Fix**: Add admin role in production Supabase project

### Issue: Admin works in production but not locally
**Cause**: Local using different Supabase project or missing admin role
**Fix**: Add admin role in local Supabase project OR update local `.env` to use production Supabase

### Issue: Different code behavior
**Cause**: Cached builds or different code versions
**Fix**: 
1. Clear browser cache
2. Redeploy on Vercel
3. Run `npm run build` locally and test with `npm run preview`

## Recommended Setup

**Best Practice**: Use ONE Supabase project for both environments
- Same database = same admin roles
- Same auth = same users
- Easier to manage

## Quick Fix Script

Run this in **BOTH** Supabase projects (if you have two):

```sql
-- Quick admin role fix
INSERT INTO public.user_roles (user_id, role)
VALUES ('bbb3ac9c-6b63-4672-854e-f47b61e2302d', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify
SELECT u.email, ur.role 
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.user_id = 'bbb3ac9c-6b63-4672-854e-f47b61e2302d';
```

