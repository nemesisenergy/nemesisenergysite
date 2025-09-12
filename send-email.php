<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$projectType = isset($_POST['projectType']) ? $_POST['projectType'] : '';
$propertyType = isset($_POST['propertyType']) ? $_POST['propertyType'] : '';
$monthlyBill = isset($_POST['monthlyBill']) ? $_POST['monthlyBill'] : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';

// Validate required fields
$errors = [];
if (empty($firstName)) $errors[] = 'First name is required';
if (empty($lastName)) $errors[] = 'Last name is required';
if (empty($email)) $errors[] = 'Email is required';
if (empty($phone)) $errors[] = 'Phone number is required';
if (empty($projectType)) $errors[] = 'Project type is required';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation errors', 'errors' => $errors]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Format project type for display
$projectTypeDisplay = [
    'residential' => 'Residential Solar System',
    'commercial' => 'Commercial Solar System',
    'hybrid' => 'Hybrid System (Solar + Battery)',
    'maintenance' => 'Maintenance & Monitoring',
    'consultation' => 'General Consultation'
][$projectType] ?? $projectType;

// Format property type for display
$propertyTypeDisplay = [
    'residential' => 'Residential',
    'commercial' => 'Commercial/Retail',
    'developer' => 'Property Developer',
    'business' => 'Business Owner'
][$propertyType] ?? ($propertyType ?: 'Not specified');

// Format monthly bill for display
$monthlyBillDisplay = [
    'under-100' => 'Under $100',
    '100-250' => '$100 - $250',
    '250-500' => '$250 - $500',
    '500-1000' => '$500 - $1,000',
    '1000-2500' => '$1,000 - $2,500',
    'over-2500' => 'Over $2,500'
][$monthlyBill] ?? ($monthlyBill ?: 'Not specified');

// Email configuration
$to = 'info@nemesisenergy.co.za';
$subject = 'New Solar Consultation Request from ' . $firstName . ' ' . $lastName;

// Create beautiful HTML email
$htmlBody = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
    <style>
        body {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #FF6B35 0%, #00D4FF 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 8px 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #FF6B35;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f1f3f4;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #FF6B35;
        }
        .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .info-value {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
        .message-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #00D4FF;
            margin-top: 15px;
        }
        .priority-badge {
            display: inline-block;
            background: #FF6B35;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 0;
            font-size: 12px;
            color: #6c757d;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #FF6B35 0%, #00D4FF 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            margin-top: 15px;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
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
                        <div class="info-value">' . htmlspecialchars($firstName . ' ' . $lastName) . '</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email Address</div>
                        <div class="info-value"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #FF6B35; text-decoration: none;">' . htmlspecialchars($email) . '</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #FF6B35; text-decoration: none;">' . htmlspecialchars($phone) . '</a></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Newsletter Subscription</div>
                        <div class="info-value">' . $newsletter . '</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">🏠 Project Details</div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Project Type</div>
                        <div class="info-value">' . htmlspecialchars($projectTypeDisplay) . '</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Property Type</div>
                        <div class="info-value">' . htmlspecialchars($propertyTypeDisplay) . '</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Monthly Energy Bill</div>
                        <div class="info-value">' . htmlspecialchars($monthlyBillDisplay) . '</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Priority Level</div>
                        <div class="info-value"><span class="priority-badge">High</span></div>
                    </div>
                </div>
            </div>';

if (!empty($message)) {
    $htmlBody .= '
            <div class="section">
                <div class="section-title">💬 Customer Message</div>
                <div class="message-box">
                    <p style="margin: 0; white-space: pre-wrap;">' . htmlspecialchars($message) . '</p>
                </div>
            </div>';
}

$htmlBody .= '
            <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:' . htmlspecialchars($email) . '" class="cta-button">
                    📧 Reply to Customer
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from the Nemesis Energy website contact form on ' . date('F j, Y \a\t g:i A T') . '</p>
        </div>
    </div>
</body>
</html>';

// Create plain text version
$textBody = "NEW SOLAR CONSULTATION REQUEST\n";
$textBody .= "=====================================\n\n";
$textBody .= "CUSTOMER INFORMATION:\n";
$textBody .= "Name: " . $firstName . " " . $lastName . "\n";
$textBody .= "Email: " . $email . "\n";
$textBody .= "Phone: " . $phone . "\n";
$textBody .= "Newsletter: " . $newsletter . "\n\n";
$textBody .= "PROJECT DETAILS:\n";
$textBody .= "Project Type: " . $projectTypeDisplay . "\n";
$textBody .= "Property Type: " . $propertyTypeDisplay . "\n";
$textBody .= "Monthly Bill: " . $monthlyBillDisplay . "\n\n";
if (!empty($message)) {
    $textBody .= "CUSTOMER MESSAGE:\n";
    $textBody .= $message . "\n\n";
}
$textBody .= "Submitted: " . date('F j, Y \a\t g:i A T') . "\n";

// Email headers
$headers = "From: Nemesis Energy Website <noreply@nemesisenergy.co.za>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"boundary123\"\r\n";

// Create multipart email body
$emailBody = "--boundary123\r\n";
$emailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$emailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$emailBody .= $textBody . "\r\n";
$emailBody .= "--boundary123\r\n";
$emailBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$emailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$emailBody .= $htmlBody . "\r\n";
$emailBody .= "--boundary123--";

// Send email
$success = mail($to, $subject, $emailBody, $headers);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Your consultation request has been sent successfully! We\'ll get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?>
