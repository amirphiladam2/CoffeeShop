# Troubleshooting Admin Access Issues

If you added the admin role but it's still not working, follow these debugging steps:

## Step 1: Verify the Role Was Actually Added

Run this SQL in Supabase SQL Editor to check if your role exists:

```sql
-- Replace with YOUR email
SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  ur.created_at,
  u.email
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';
```

**Expected Result**: You should see a row with `role = 'admin'`

**If you see nothing**: The role wasn't added. See Step 2.

## Step 2: Add the Role (If Missing)

If Step 1 returned nothing, add the role using this SQL:

```sql
-- Find your user by email and add admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify it was added
SELECT 
  ur.user_id,
  ur.role,
  u.email
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com' AND ur.role = 'admin';
```

## Step 3: Check Browser Console

1. Open your app at https://havenbrew.vercel.app
2. **Press F12** to open Developer Tools
3. Go to **Console** tab
4. **Sign in** to your account
5. Look for these messages:
   - ✅ "Admin role found: {role: 'admin'}" = Working!
   - ❌ "No admin role found for user: ..." = Role not found
   - ❌ "Error checking admin role..." = There's an error

## Step 4: Check RLS Policies

The RLS policy should allow you to read your own roles. Verify it exists:

```sql
-- Check if RLS policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'user_roles';
```

You should see a policy like "Users can view their own roles".

**If policies are missing**, create them:

```sql
-- Create missing policy
CREATE POLICY IF NOT EXISTS "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);
```

## Step 5: Test the has_role Function

Try using the database function directly:

```sql
-- Replace with YOUR user ID
SELECT public.has_role('YOUR_USER_ID_HERE'::uuid, 'admin'::public.app_role);
```

**Expected Result**: Should return `true` if you have admin role

## Step 6: Clear Cache and Re-login

1. **Clear browser cache**: Ctrl+Shift+Delete → Clear all
2. **Sign out** from https://havenbrew.vercel.app
3. **Close browser tabs** with the app
4. **Open a new tab** and go to https://havenbrew.vercel.app
5. **Sign in** again
6. **Check browser console** (F12) for admin role messages
7. Try `/admin` again

## Step 7: Verify You're Using the Correct Account

Make sure you're signed in with the SAME email that has the admin role:

```sql
-- Check which user is logged in
-- In browser console (F12), type:
localStorage.getItem('sb-<YOUR_PROJECT_REF>-auth-token')

-- Then verify that user has admin role:
SELECT * FROM public.user_roles WHERE user_id = 'THE_ID_FROM_ABOVE';
```

## Common Issues and Fixes

### Issue 1: "Cannot insert - permission denied"
**Fix**: Run the SQL as a Supabase admin in the SQL Editor (not through the app)

### Issue 2: Role exists but still not working
**Fix**: 
1. Make sure you're using `'admin'::public.app_role` (with enum casting)
2. Check browser console for errors
3. Sign out and sign back in

### Issue 3: RLS blocking the query
**Fix**: The policy "Users can view their own roles" should allow this. If not, recreate it (see Step 4)

### Issue 4: Wrong user_id
**Fix**: Double-check you're using the correct UUID from `auth.users` table

## Quick Debug SQL Script

Run this all at once to check everything:

```sql
-- 1. Find your user
SELECT id, email, created_at FROM auth.users WHERE email = 'your-email@example.com';

-- 2. Check if admin role exists for your user
SELECT 
  ur.*,
  u.email
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';

-- 3. Test has_role function (replace USER_ID from step 1)
SELECT public.has_role('USER_ID_FROM_STEP_1'::uuid, 'admin'::public.app_role);

-- 4. Add role if missing (replace USER_ID from step 1)
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_FROM_STEP_1', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- 5. Verify final state
SELECT 
  ur.role,
  u.email,
  public.has_role(ur.user_id, 'admin'::public.app_role) as has_admin
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com' AND ur.role = 'admin';
```

After running this, check your browser console when signing in to see the admin check results.

---

**Still not working?** Share the browser console errors and SQL query results, and we can debug further!

