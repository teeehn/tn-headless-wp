<?php
/**
 * Removing redirects.
 *  References:
 *  https://github.com/EvanAgee/vuejs-wordpress-theme-starter
 *  https://vuejsfeed.com/blog/vue-js-wordpress-theme-starter
 */
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

/**
 * Remove un-needed meta from the head.
 * References:
 *  https://developer.wordpress.org/reference/hooks/wp_head/
 *  https://wp-mix.com/wordpress-disable-rest-api-header-links/
 *  http://cubiq.org/clean-up-and-optimize-wordpress-for-your-next-theme
 */
function tn_cleanup() {
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
add_action('after_setup_theme', 'tn_cleanup');

/**
 * More cleanup - remove wp-embed from wp_footer.
 * 
 * reference:
 * https://techglimpse.com/wp-embed-script-feature-remove/
 */
function tn_cleanup_footer() {
    wp_deregister_script( 'wp-embed' );
   }
add_action( 'wp_footer', 'tn_cleanup_footer' );

/**
 * Add the bundle for the application.
 */
function tn_add_bundle() {
    wp_enqueue_script('tn_bundle', get_stylesheet_directory_uri() . '/dist/js/bundle.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'tn_add_bundle');
