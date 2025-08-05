# Email Configuration Setup

## Setting up EmailJS for Contact Form

To make the contact form functional and send emails to info@bhandari-prashant.com.np, follow these steps:

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up your template with these variables:
   ```
   Subject: New message from {{subject}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```
4. Note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abc123xyz`)

### 5. Update the Website Code
1. Open `index.html` and replace `YOUR_PUBLIC_KEY` with your actual public key:
   ```javascript
   emailjs.init('YOUR_ACTUAL_PUBLIC_KEY');
   ```

2. Open `script.js` and update these variables:
   ```javascript
   const serviceID = 'your_actual_service_id';
   const templateID = 'your_actual_template_id';
   const userID = 'your_actual_public_key';
   ```

### 6. Test the Contact Form
1. Deploy your website
2. Fill out the contact form
3. Check your email inbox for the message

## Fallback Options

If EmailJS is not configured or fails, the form will:
1. Offer to open the user's default email client with a pre-filled message
2. Show the direct email address: info@bhandari-prashant.com.np

## Email Template Example

Here's a suggested email template for EmailJS:

**Subject:** New Contact Form Message: {{subject}}

**Body:**
```
You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

## Troubleshooting

1. **Form not sending emails**: Check browser console for errors
2. **EmailJS quota exceeded**: Free accounts have monthly limits
3. **Emails going to spam**: Configure SPF/DKIM records for your domain
4. **Template variables not working**: Ensure variable names match exactly

## Security Notes

- Never expose your EmailJS private key in client-side code
- The public key is safe to use in frontend JavaScript
- Consider implementing rate limiting for the contact form
- Validate all input fields before sending
