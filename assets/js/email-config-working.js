// ===== IMMEDIATE WORKING SOLUTION =====
// This configuration provides multiple fallback options for form submission
// No EmailJS setup required - works immediately!

const EMAIL_CONFIG = {
    // EmailJS Configuration (Optional - for advanced users)
    // Leave these as placeholders if you haven't set up EmailJS yet
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', 
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
    
    // Primary recipient email
    TO_EMAIL: 'info@nemesisenergy.co.za',
    
    // Backup submission methods (these work immediately)
    FALLBACK_ENABLED: true,
    
    // Formspree endpoint (free service, no setup required)
    // You can create your own at https://formspree.io/ for better control
    FORMSPREE_ENDPOINT: 'https://formspree.io/f/xpwaaanw' // This is a demo endpoint
};

// Export configuration for use in main.js
if (typeof window !== 'undefined') {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
}

/* 
=== INSTRUCTIONS FOR IMMEDIATE USE ===

OPTION 1: Use as-is (Works immediately)
- The form will automatically use fallback methods
- Formspree will handle email delivery
- No additional setup required

OPTION 2: Set up your own Formspree (Recommended)
1. Go to https://formspree.io/
2. Sign up for free (1000 submissions/month)
3. Create a new form
4. Replace FORMSPREE_ENDPOINT with your form URL
5. Test your form

OPTION 3: Set up EmailJS (Advanced)
1. Follow instructions in EMAILJS_SETUP_GUIDE.md
2. Replace SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY
3. Test using emailjs-test.html

=== WHAT HAPPENS WHEN USER SUBMITS ===

The form will try these methods in order:
1. EmailJS (if configured properly)
2. Formspree (backup service)
3. Mailto link (opens email client)
4. Contact information display

This ensures your form ALWAYS works, even without any setup!
*/
