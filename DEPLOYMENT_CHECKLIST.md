# Deployment Checklist for BrewHaven

## ✅ Pre-Deployment Checklist

### 1. **Account Recovery** ✅
- ✅ Password reset functionality added
- ✅ Users can click "Forgot password?" on login page
- ✅ Email reset link will be sent via Supabase
- ✅ Reset redirect configured

### 2. **Environment Variables**
Make sure these are set in your hosting platform:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon/public key

**Important**: Update Supabase email templates to use your production URL for password reset links!

### 3. **Supabase Configuration**

#### Email Templates Setup
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Update **Reset Password** template redirect URL to your production URL:
   - Change: `{{ .SiteURL }}/auth?reset=true`
   - Use your production URL: `https://your-app.vercel.app/auth?reset=true`

#### Site URL Configuration
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Set **Site URL** to your production URL: `https://your-app.vercel.app`
3. Add to **Redirect URLs**: 
   - `https://your-app.vercel.app/auth`
   - `https://your-app.vercel.app/auth?reset=true`

### 4. **Database Migrations**
Run all migrations in order:
- ✅ `20251101105155_e6290059-9b84-4cfa-b8ca-5658134d3d8f.sql` (core tables)
- ✅ `20251102000000_ecommerce_tables.sql` (orders, prices)
- ⚠️ `20251103000000_ice_flavours.sql` (ice flavours - run this!)

### 5. **Build Configuration**
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Environment variables are properly configured

### 6. **Code Quality**
- ✅ No linting errors
- ✅ TypeScript strict mode enabled
- ✅ Error boundaries in place
- ✅ Environment variable validation

## 🚀 Deployment Steps

### For Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Deploy!

### For Netlify:
1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables
6. Deploy!

## ⚠️ Post-Deployment Checklist

1. **Test Password Reset**:
   - Go to `/auth`
   - Click "Forgot password?"
   - Enter email and send reset link
   - Check email and verify link works

2. **Verify Environment Variables**:
   - Check console for any errors
   - Verify Supabase connection works

3. **Test Admin Access**:
   - Ensure admin user is set up in database
   - Test admin dashboard access

4. **Update Supabase Email Templates**:
   - Password reset emails use production URL
   - Email confirmation uses production URL

## 📝 Notes

- The password reset flow sends users an email with a link
- Users click the link and get redirected to `/auth?reset=true`
- They can then set a new password
- Make sure Supabase email templates are configured for production!

