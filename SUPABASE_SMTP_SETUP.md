# Supabase SMTP Configuration Guide

For email/password authentication to work properly (email verification, password reset), you need to configure SMTP in Supabase.

## Why You Need SMTP

Supabase authentication features require email sending:
- ✅ **Email Verification**: When users sign up, they receive a confirmation email
- ✅ **Password Reset**: Users can reset their password via email
- ✅ **Magic Link**: Alternative authentication method (optional)

## Option 1: Use Supabase's Built-in SMTP (Development/Testing)

Supabase provides a default SMTP service that works for development and small-scale applications.

### Setup Steps:
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Auth** → **Email Templates**
3. By default, Supabase uses its own email service
4. This works automatically but has limitations:
   - Limited to 3 emails per hour per user
   - Emails come from `noreply@mail.app.supabase.io`
   - Subject to rate limiting

### For Production:
If you're deploying to production, it's recommended to configure a custom SMTP provider.

## Option 2: Configure Custom SMTP (Recommended for Production)

You can use any SMTP provider. Popular options:

### Using Gmail SMTP (Free)
1. Go to Supabase Dashboard → **Settings** → **Auth**
2. Scroll down to **SMTP Settings**
3. Enable **Custom SMTP**
4. Enter your SMTP details:

**Gmail Settings:**
```
Host: smtp.gmail.com
Port: 465 (SSL) or 587 (TLS)
Username: your-email@gmail.com
Password: Your Gmail App Password (not regular password!)
Sender email: your-email@gmail.com
Sender name: BrewHaven
```

**Important for Gmail:**
- You need to generate an **App Password** (not your regular password)
- Steps to get Gmail App Password:
  1. Go to Google Account → Security
  2. Enable 2-Step Verification
  3. Go to App Passwords
  4. Generate a new app password for "Mail"
  5. Use this 16-character password in Supabase

### Using SendGrid (Free tier: 100 emails/day)
1. Sign up at https://sendgrid.com
2. Create an API key in SendGrid dashboard
3. In Supabase:
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: Your SendGrid API Key
Sender email: your-verified-email@yourdomain.com
Sender name: BrewHaven
```

### Using Mailgun (Free tier: 5,000 emails/month)
1. Sign up at https://www.mailgun.com
2. Get SMTP credentials from dashboard
3. In Supabase:
```
Host: smtp.mailgun.org
Port: 587
Username: your-mailgun-smtp-username
Password: your-mailgun-smtp-password
Sender email: your-verified-domain@yourdomain.com
Sender name: BrewHaven
```

### Using AWS SES (Very affordable)
1. Set up AWS SES and verify your email/domain
2. In Supabase:
```
Host: email-smtp.us-east-1.amazonaws.com (or your region)
Port: 587
Username: Your AWS SES SMTP Username
Password: Your AWS SES SMTP Password
Sender email: verified-email@yourdomain.com
Sender name: BrewHaven
```

### Using Resend (Developer-friendly, Free tier: 3,000 emails/month)
1. Sign up at https://resend.com
2. Get SMTP credentials
3. In Supabase:
```
Host: smtp.resend.com
Port: 465 or 587
Username: resend
Password: Your Resend API Key
Sender email: your-verified-email@yourdomain.com
Sender name: BrewHaven
```

## Configuration Steps in Supabase Dashboard

1. **Go to Supabase Dashboard** → Your Project
2. **Settings** → **Auth** → Scroll to **SMTP Settings**
3. **Enable Custom SMTP**
4. Fill in the form:
   - **Sender Email**: Must be verified in your SMTP provider
   - **Sender Name**: Display name (e.g., "BrewHaven")
   - **Host**: Your SMTP server hostname
   - **Port**: Usually 587 (TLS) or 465 (SSL)
   - **Username**: Your SMTP username
   - **Password**: Your SMTP password
   - **Security**: Choose TLS or SSL

5. **Click "Save"**
6. **Test** by sending a test email

## Additional Configuration

### Email Templates

After configuring SMTP, customize your email templates:

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - **Confirm signup** - Email verification
   - **Reset password** - Password reset
   - **Magic Link** - Passwordless login (optional)
   - **Change email address** - Email change confirmation

### Email Template Variables

You can use these variables in templates:
- `{{ .SiteURL }}` - Your site URL
- `{{ .ConfirmationURL }}` - Email confirmation link
- `{{ .Token }}` - Authentication token
- `{{ .TokenHash }}` - Hashed token
- `{{ .RedirectTo }}` - Redirect URL after confirmation

### Example Password Reset Template

```
Subject: Reset your BrewHaven password

Hi there!

Click the link below to reset your password:

{{ .ConfirmationURL }}

This link will expire in 24 hours.

If you didn't request this, you can safely ignore this email.

Thanks,
The BrewHaven Team
```

## Testing SMTP Configuration

1. In Supabase Dashboard → **Authentication** → **Users**
2. Click **Send test email** (if available)
3. Or test by:
   - Creating a new account (should receive verification email)
   - Requesting password reset (should receive reset email)

## Troubleshooting

### Emails not sending?
- ✅ Check SMTP credentials are correct
- ✅ Verify sender email is verified in SMTP provider
- ✅ Check spam/junk folder
- ✅ Check Supabase logs for SMTP errors
- ✅ Ensure port and security settings match your provider

### Emails going to spam?
- ✅ Use a verified domain email (not free providers if possible)
- ✅ Set up SPF/DKIM records in your DNS
- ✅ Use a professional sender name

### Rate limiting issues?
- ✅ Upgrade your SMTP provider plan
- ✅ Consider using a dedicated email service for production

## Quick Start (Gmail Example)

For quick testing with Gmail:

1. Enable 2FA on your Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. In Supabase → Settings → Auth → SMTP:
   ```
   Sender Email: your-email@gmail.com
   Sender Name: BrewHaven
   Host: smtp.gmail.com
   Port: 587
   Security: TLS
   Username: your-email@gmail.com
   Password: [Your 16-char app password]
   ```
4. Save and test!

## For Production Deployment

1. **Use a dedicated email service** (SendGrid, Mailgun, AWS SES)
2. **Verify your domain** for better deliverability
3. **Set up SPF/DKIM records** in your DNS
4. **Monitor email delivery** in your provider's dashboard
5. **Update email templates** with production URLs

---

**Note**: Supabase's built-in SMTP works for development, but for production with real users, configure a proper SMTP provider for better deliverability and higher rate limits.

