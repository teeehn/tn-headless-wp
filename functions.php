<?php
/**
 * Remove un-needed meta from the head.
 * References:
 *  https://developer.wordpress.org/reference/hooks/wp_head/
 *  https://wp-mix.com/wordpress-disable-rest-api-header-links/
 *  http://cubiq.org/clean-up-and-optimize-wordpress-for-your-next-theme
 */
function tn_clean_head() {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'dns_prefetch');

    add_filter('the_generator', '__return_false');
    add_filter( 'emoji_svg_url', '__return_false' );

    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );   
    
    // Disable REST API link tag
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    // Disable oEmbed Discovery Links
    remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
    // Disable REST API link in HTTP headers
    remove_action('template_redirect', 'rest_output_link_header', 11, 0);
}
add_action('after_setup_theme', 'tn_clean_head');
