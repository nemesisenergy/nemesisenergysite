# 📧 EmailJS Setup Guide - Client-Side Email Solution

## 🚀 Overview
This guide will help you set up EmailJS to send emails directly from your contact form without needing a backend server. EmailJS is perfect for static websites and provides reliable email delivery.

## 📋 Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **SendGrid** (for production)
   - **Mailgun** (for production)

#### For Gmail Setup:
1. Select **Gmail**
2. Click **Connect Account**
3. Authorize EmailJS to access your Gmail
4. Note your **Service ID** (e.g., `service_nemesis`)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template ID: `template_consultation`
4. Copy and paste the following template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #00D4FF 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: 600; color: #FF6B35; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #f1f3f4; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #FF6B35; }
        .info-label { font-size: 12px; font-weight: 600; color: #6c757d; text-transform: uppercase; margin-bottom: 4px; }
        .info-value { font-size: 14px; color: #333; font-weight: 500; }
        .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00D4FF; margin-top: 15px; }
        .priority-badge { background: #FF6B35; color: white; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #00D4FF 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 15px; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 New Solar Consultation Request</h1>
            <p>A potential customer is interested in solar energy solutions</p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">👤 Customer Information</div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">{{customer_name}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email Address</div>
                        <div class="info-value"><a href="mailto:{{customer_email}}" style="color: #FF6B35;">{{customer_email}}</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value"><a href="tel:{{customer_phone}}" style="color: #FF6B35;">{{customer_phone}}</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Newsletter Subscription</div>
                        <div class="info-value">{{customer_newsletter}}</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">🏠 Project Details</div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Project Type</div>
                        <div class="info-value">{{customer_project}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Property Type</div>
                        <div class="info-value">{{customer_property}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Monthly Energy Bill</div>
                        <div class="info-value">{{customer_bill}}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Priority Level</div>
                        <div class="info-value"><span class="priority-badge">High</span></div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">💬 Customer Message</div>
                <div class="message-box">
                    <p style="margin: 0; white-space: pre-wrap;">{{customer_message}}</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:{{customer_email}}" class="cta-button">📧 Reply to Customer</a>
            </div>
        </div>
        
        <div class="footer">
            <p>Submitted on {{formatted_date}} via Nemesis Energy website</p>
        </div>
    </div>
</body>
</html>
```

### 4. Configure Template Settings
1. **Template Name**: `Nemesis Energy - Consultation Request`
2. **Subject**: `New Solar Consultation Request from {{customer_name}}`
3. **From Name**: `Nemesis Energy Website`
4. **From Email**: Your connected email (e.g., your Gmail)
5. **To Email**: `info@nemesisenergy.co.za`

### 5. Get Your Configuration IDs
After setup, you'll have:
- **Service ID**: (e.g., `service_nemesis`)
- **Template ID**: `template_consultation`
- **Public Key**: Found in your EmailJS dashboard under Integration

### 6. Update Your Website Code
Replace the placeholder values in your `main.js` file:

```javascript
// In the submitForm function, replace these values:
const serviceID = 'service_nemesis'; // Your actual service ID
const templateID = 'template_consultation'; // Your template ID
const publicKey = 'YOUR_ACTUAL_PUBLIC_KEY'; // Your public key

// In the initializeEmailJS function:
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY'); // Your public key
```

## 🧪 Testing Your Setup

### 1. Test Email Template
1. In EmailJS dashboard, go to your template
2. Click **Test** button
3. Fill in test data to verify the email looks correct

### 2. Test Live Form
1. Open your website
2. Fill out the contact form completely
3. Submit the form
4. Check if:
   - Success message appears
   - Email arrives at info@nemesisenergy.co.za
   - Email formatting looks professional

## 🔧 Configuration Example

Here's how your final configuration should look:

```javascript
// Example configuration (replace with your actual values)
const serviceID = 'service_abc123';
const templateID = 'template_consultation';
const publicKey = 'user_xyz789';
```

## 📊 EmailJS Features & Limits

### Free Plan:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 10 email templates
- ✅ Email history & analytics

### Paid Plans (if needed):
- 🚀 More emails per month
- 🚀 Priority support
- 🚀 Advanced features

## 🛡️ Security & Best Practices

1. **Rate Limiting**: EmailJS has built-in rate limiting
2. **Spam Protection**: Use their spam filtering features
3. **Domain Restrictions**: Set allowed domains in EmailJS dashboard
4. **Monitor Usage**: Check your dashboard regularly

## 🚨 Troubleshooting

### Common Issues:
1. **"EmailJS is not defined"** - Check if script is loaded properly
2. **"Service not found"** - Verify your Service ID
3. **"Template not found"** - Check your Template ID
4. **Emails not arriving** - Check spam folder, verify email settings

### Debug Mode:
Add this to test EmailJS connection:
```javascript
emailjs.send('service_id', 'template_id', {}, 'public_key')
  .then(response => console.log('SUCCESS!', response))
  .catch(error => console.log('FAILED...', error));
```

## ✅ Final Checklist

- [ ] EmailJS account created
- [ ] Email service connected (Gmail/Outlook/etc.)
- [ ] Email template created with provided HTML
- [ ] Service ID, Template ID, and Public Key obtained
- [ ] JavaScript code updated with actual IDs
- [ ] Form tested successfully
- [ ] Emails arriving at info@nemesisenergy.co.za
- [ ] Email formatting looks professional

## 🎉 You're All Set!

Your contact form now sends beautiful, professional emails directly from the client-side without needing any backend server. The emails will arrive at info@nemesisenergy.co.za with all the customer information formatted beautifully!

## 💡 Pro Tips

1. **Backup Solution**: Keep the PHP version as a backup
2. **Analytics**: Monitor your EmailJS dashboard for usage stats
3. **Templates**: Create different templates for different types of inquiries
4. **Auto-Reply**: Set up auto-reply templates for customers
