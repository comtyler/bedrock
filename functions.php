<?php
	/*
	 * Include LiveReload script on local instance
	 */
	if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
		wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
		wp_enqueue_script('livereload');
	}
	
	/*
	 * Disable XMLRPC
	 */
	add_filter( 'xmlrpc_enabled', '__return_false' );

	/*
	 * Auto update plugins
	 */
	add_filter( 'auto_update_plugin', '__return_true' );

	/*
	 * Disable css customization options in Wordpress Admin
	 */
	function remove_css_customization($wp_customize) {
		$wp_customize->remove_section('custom_css');
	}
	add_action( 'customize_register', 'remove_css_customization' );

	/*
	 * Activate menu functionality
	 */
	function register_menu() {
		register_nav_menus();
	}
	add_action( 'init', 'register_menu' );

	/*
	 *  Fix 'autop' filter for image tags (dumb)
	 */
	function filter_ptags_on_images($content){
		return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
	}
	add_filter('the_content', 'filter_ptags_on_images');

	/*
	 * Change the excerpt ellipse
	 */
	function new_excerpt_more($more) {
		return '...';
	}
	add_filter('excerpt_more', 'new_excerpt_more');

	/*
	 * Change the excerpt length
	 */
	function custom_excerpt_length( $length ) {
		return 25;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

	/*
	 * Removes comment admin menu pages
	 */
	function remove_comment_admin_pages() {
		remove_menu_page( 'edit-comments.php' );
	}
	add_action( 'admin_menu', 'remove_comment_admin_pages' );

	/*
	 * Removes comments from post and pages
	 */
	function remove_comment_support() {
		remove_post_type_support( 'post', 'comments' );
		remove_post_type_support( 'page', 'comments' );
	}
	add_action( 'init', 'remove_comment_support', 100 );

	/*
	 * Removes "Comments" from admin bar
	 */
	function remove_comment_admin_menu() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu('comments');
	}
	add_action( 'wp_before_admin_bar_render', 'remove_comment_admin_menu' );

	/*
	 * Add thumbnail support to the 'Post' post type
	 */
	add_theme_support( 'post-thumbnails', array( 'post' ) );

	/*
	 * Remove tags support from posts
	 */
	function unregister_post_tags() {
		unregister_taxonomy_for_object_type('post_tag', 'post');
	}
	add_action('init', 'unregister_post_tags');

	/*
	 * Remove autop from excerpt
	 */
	remove_filter( 'the_excerpt', 'wpautop' );

	/*
	 * Enqueue our styles and scripts in a way that busts the client-side cache
	 */
	function register_assets() {
		$js_path = get_template_directory_uri() . '/assets/scripts/dist/application.js';
		
		wp_enqueue_style( 'main', get_stylesheet_uri(), array(), filemtime(get_stylesheet_directory()), 'all' );
		wp_enqueue_script( 'application', $js_path, array(), filemtime($js_path), true );
	}

	/*
	 * Cleaning up the wp_head call
	 */
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
			wp_deregister_script('jquery');                                     	// De-Register jQuery
			wp_register_script('jquery', '', '', '', true);                     	// Register as 'empty', because we manually insert our script in header.php
		}
	}
	add_action('init', 'head_cleanup');
?>