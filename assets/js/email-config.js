// ===== EMAILJS CONFIGURATION =====
// Replace these values with your actual EmailJS configuration
// Get these from your EmailJS dashboard: https://dashboard.emailjs.com/

const EMAIL_CONFIG = {
    // Your EmailJS Service ID (e.g., 'service_abc123')
    SERVICE_ID: 'YOUR_SERVICE_ID',
    
    // Your EmailJS Template ID (e.g., 'template_consultation')
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
    
    // Your EmailJS Public Key (e.g., 'user_xyz789')
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
    
    // Recipient email (where form submissions will be sent)
    TO_EMAIL: 'info@nemesisenergy.co.za'
};

// Export configuration for use in main.js
if (typeof window !== 'undefined') {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
}

// Instructions:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template using the provided HTML in EMAILJS_SETUP_GUIDE.md
// 4. Get your Service ID, Template ID, and Public Key from your dashboard
// 5. Replace the placeholder values above with your actual configuration
// 6. Test your form to ensure emails are being sent correctly
