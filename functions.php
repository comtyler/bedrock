<?php
	/*
	 * Disable css customization options in Wordpress Admin
	 */
	function remove_css_customization($wp_customize) {
		$wp_customize->remove_section('custom_css');
	}
	add_action( 'customize_register', 'remove_css_customization' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Cleaning up the wp_head call
	 */
  add_action('init', 'head_cleanup');
  function head_cleanup() {
      remove_action( 'wp_head', 'feed_links_extra', 3 );                      // Category Feeds
      remove_action( 'wp_head', 'feed_links', 2 );                            // Post and Comment Feeds
      remove_action( 'wp_head', 'rsd_link' );                                 // EditURI link
      remove_action( 'wp_head', 'wlwmanifest_link' );                         // Windows Live Writer
      remove_action( 'wp_head', 'index_rel_link' );                           // index link
      remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );              // previous link
      remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );               // start link
      remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 					// Emoji crap
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); // Emoji crap
			remove_action( 'wp_print_styles', 'print_emoji_styles' ); 							// Emoji crap
			remove_action( 'admin_print_styles', 'print_emoji_styles' );						// Emoji crap
			remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );							// Rest API header link
      remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );   // Links for Adjacent Posts
      remove_action( 'wp_head', 'wp_generator' );                             // WP version
      if (!is_admin()) {
          wp_deregister_script('jquery');                                     // De-Register jQuery
          wp_register_script('jquery', '', '', '', true);                     // Register as 'empty', because we manually insert our script in header.php
      }
  }
?>