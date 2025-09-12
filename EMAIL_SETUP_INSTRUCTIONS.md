# Email Configuration Instructions

## For Local Development (Testing)

### Option 1: Using XAMPP (Recommended)
1. Download and install XAMPP from https://www.apachefriends.org/
2. Copy all website files to `C:\xampp\htdocs\nemesisenergy\`
3. Start Apache from XAMPP Control Panel
4. Access your site at `http://localhost/nemesisenergy/`

### Option 2: Using WAMP
1. Download and install WAMP from http://www.wampserver.com/
2. Copy all website files to `C:\wamp64\www\nemesisenergy\`
3. Start WAMP services
4. Access your site at `http://localhost/nemesisenergy/`

## Email Configuration

The PHP script uses the built-in `mail()` function. For production use:

### For Production Hosting:
- Most web hosting providers support PHP mail() function out of the box
- Upload all files including `send-email.php` to your web server
- Ensure your hosting provider allows email sending

### For Enhanced Email Delivery (Recommended):
Consider using services like:
- **SendGrid**: Professional email delivery service
- **Mailgun**: Reliable email API
- **Amazon SES**: Cost-effective email service

### SMTP Configuration (Alternative):
If you want to use SMTP instead of mail(), you can modify the PHP script to use PHPMailer:

1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer
2. Replace the mail() function with SMTP configuration
3. Configure with your email provider's SMTP settings

## Testing the Form

1. Start your local server (XAMPP/WAMP)
2. Navigate to the contact page
3. Fill out the form completely
4. Click "Get Free Consultation"
5. Check if the email was sent successfully

## Troubleshooting

- Ensure PHP is enabled on your server
- Check server error logs if emails aren't sending
- Verify that the `send-email.php` file has proper permissions
- Test email functionality with a simple PHP mail script first

## Security Notes

- The script includes basic input validation and sanitization
- For production, consider adding CSRF protection
- Implement rate limiting to prevent spam
- Use environment variables for sensitive configuration
