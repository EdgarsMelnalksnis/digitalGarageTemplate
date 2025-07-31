<?php
// Ensure error reporting is off in production for security, but helpful for development
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Sanitize user inputs
function sanitize_input($data) {
    // Basic sanitization: trim whitespace, strip slashes, convert special characters to HTML entities
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Define the paths to your template files
// Ensure these files (index.html, style.css, script.js) are in the same directory as this PHP script
$html_template_path = 'index.html'; // This is the template with placeholders
$css_file_path = 'style.css';
$js_file_path = 'script.js';

// Read the content of the template files
$html_template_content = file_get_contents($html_template_path);
$css_content = file_get_contents($css_file_path);
$js_content = file_get_contents($js_file_path);

// Basic error handling if files are not found
if ($html_template_content === false) {
    die("Error: HTML template file '{$html_template_path}' not found or unreadable. Please ensure it exists.");
}
if ($css_content === false) {
    die("Error: CSS file '{$css_file_path}' not found or unreadable. Please ensure it exists.");
}
if ($js_content === false) {
    die("Error: JavaScript file '{$js_file_path}' not found or unreadable. Please ensure it exists.");
}

// Define placeholders and their corresponding POST field names
// MAKE SURE these keys match the 'name' attributes in your builder.html form EXACTLY
$placeholders_map = [
    '{{WEBSITE_TITLE}}'                        => 'WEBSITE_TITLE',
    '{{LOGO_ALT_TEXT}}'                        => 'LOGO_ALT_TEXT',
    '{{LOGO_IMAGE_PATH}}'                      => 'LOGO_IMAGE_PATH',
    '{{HEADER_CTA_BUTTON_TEXT}}'               => 'HEADER_CTA_BUTTON_TEXT',
    '{{MOBILE_NAV_CTA_BUTTON_TEXT}}'           => 'MOBILE_NAV_CTA_BUTTON_TEXT',
    '{{HERO_HEADING}}'                         => 'HERO_HEADING',
    '{{HERO_PARAGRAPH}}'                       => 'HERO_PARAGRAPH',
    '{{HERO_CTA_BUTTON_TEXT}}'                 => 'HERO_CTA_BUTTON_TEXT',
    '{{SERVICES_SECTION_HEADING}}'             => 'SERVICES_SECTION_HEADING',
    '{{SERVICE_1_ICON_ALT_TEXT}}'              => 'SERVICE_1_ICON_ALT_TEXT',
    '{{SERVICE_1_ICON_PATH}}'                  => 'SERVICE_1_ICON_PATH',
    '{{SERVICE_1_TITLE}}'                      => 'SERVICE_1_TITLE',
    '{{SERVICE_1_DESCRIPTION}}'                => 'SERVICE_1_DESCRIPTION',
    '{{SERVICE_2_ICON_ALT_TEXT}}'              => 'SERVICE_2_ICON_ALT_TEXT',
    '{{SERVICE_2_ICON_PATH}}'                  => 'SERVICE_2_ICON_PATH',
    '{{SERVICE_2_TITLE}}'                      => 'SERVICE_2_TITLE',
    '{{SERVICE_2_DESCRIPTION}}'                => 'SERVICE_2_DESCRIPTION',
    '{{SERVICE_3_ICON_ALT_TEXT}}'              => 'SERVICE_3_ICON_ALT_TEXT',
    '{{SERVICE_3_ICON_PATH}}'                  => 'SERVICE_3_ICON_PATH',
    '{{SERVICE_3_TITLE}}'                      => 'SERVICE_3_TITLE',
    '{{SERVICE_3_DESCRIPTION}}'                => 'SERVICE_3_DESCRIPTION',
    '{{EXPLORE_SERVICES_BUTTON_TEXT}}'         => 'EXPLORE_SERVICES_BUTTON_TEXT',
    '{{TESTIMONIALS_SECTION_HEADING}}'         => 'TESTIMONIALS_SECTION_HEADING',
    '{{TESTIMONIAL_1_QUOTE}}'                  => 'TESTIMONIAL_1_QUOTE',
    '{{TESTIMONIAL_1_CLIENT_INFO}}'            => 'TESTIMONIAL_1_CLIENT_INFO',
    '{{TESTIMONIAL_2_QUOTE}}'                  => 'TESTIMONIAL_2_QUOTE',
    '{{TESTIMONIAL_2_CLIENT_INFO}}'            => 'TESTIMONIAL_2_CLIENT_INFO',
    '{{TESTIMONIAL_3_QUOTE}}'                  => 'TESTIMONIAL_3_QUOTE',
    '{{TESTIMONIAL_3_CLIENT_INFO}}'            => 'TESTIMONIAL_3_CLIENT_INFO',
    '{{FOOTER_TEXT}}'                          => 'FOOTER_TEXT',
    '{{POPUP_FORM_TITLE}}'                     => 'POPUP_FORM_TITLE',
    '{{FORM_INPUT_PLACEHOLDER_NAME}}'          => 'FORM_INPUT_PLACEHOLDER_NAME',
    '{{FORM_INPUT_PLACEHOLDER_EMAIL}}'         => 'FORM_INPUT_PLACEHOLDER_EMAIL',
    '{{FORM_SELECT_DEFAULT_OPTION}}'           => 'FORM_SELECT_DEFAULT_OPTION',
    '{{FORM_SELECT_OPTION_1}}'                 => 'FORM_SELECT_OPTION_1',
    '{{FORM_SELECT_OPTION_2}}'                 => 'FORM_SELECT_OPTION_2',
    '{{FORM_SELECT_OPTION_3}}'                 => 'FORM_SELECT_OPTION_3',
    '{{FORM_SELECT_OPTION_4}}'                 => 'FORM_SELECT_OPTION_4',
    '{{FORM_SELECT_OPTION_5}}'                 => 'FORM_SELECT_OPTION_5',
    '{{FORM_SELECT_OPTION_6}}'                 => 'FORM_SELECT_OPTION_6',
    '{{FORM_TEXTAREA_PLACEHOLDER_DESCRIPTION}}'=> 'FORM_TEXTAREA_PLACEHOLDER_DESCRIPTION',
    '{{FORM_SUBMIT_BUTTON_TEXT}}'              => 'FORM_SUBMIT_BUTTON_TEXT',
    '{{ABOUT_POPUP_HEADING}}'                  => 'ABOUT_POPUP_HEADING',
    '{{ABOUT_POPUP_PARAGRAPH}}'                => 'ABOUT_POPUP_PARAGRAPH',
    '{{CONTACT_POPUP_HEADING}}'                => 'CONTACT_POPUP_HEADING',
    '{{CONTACT_EMAIL}}'                        => 'CONTACT_EMAIL',
    '{{CONTACT_PHONE}}'                        => 'CONTACT_PHONE',
    '{{CONTACT_ADDRESS}}'                      => 'CONTACT_ADDRESS',
];

// Arrays to hold the placeholders and their corresponding sanitized user values
$find = [];
$replace = [];

foreach ($placeholders_map as $placeholder_key => $post_field_name) {
    $find[] = $placeholder_key;
    // Get the value from POST, sanitize it, or use an empty string if not set
    $replace[] = isset($_POST[$post_field_name]) ? sanitize_input($_POST[$post_field_name]) : '';
}

// Perform the replacements in the HTML content
$generated_html_content = str_replace($find, $replace, $html_template_content);

// --- Create a ZIP file ---
$zip_file_name = 'my_custom_website_' . time() . '.zip'; // Unique name for the zip file
$zip = new ZipArchive();

if ($zip->open($zip_file_name, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
    // Add the generated HTML file to the zip
    $zip->addFromString('index.html', $generated_html_content);

    // Add the original CSS file to the zip
    $zip->addFromString('style.css', $css_content);

    // Add the original JavaScript file to the zip
    $zip->addFromString('script.js', $js_content);

    $zip->close();

    // --- Force download the ZIP file ---
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="' . basename($zip_file_name) . '"');
    header('Content-Length: ' . filesize($zip_file_name));
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Clear output buffer to ensure headers are sent correctly
    if (ob_get_level()) {
        ob_end_clean();
    }
    
    readfile($zip_file_name); // Read the file and output it to the browser

    // Delete the temporary zip file after sending
    unlink($zip_file_name);

    exit; // Stop script execution after sending file
} else {
    die("Could not create ZIP archive. Check permissions in the directory.");
}
?>
