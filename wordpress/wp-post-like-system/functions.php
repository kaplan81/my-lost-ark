<?php
// SIMPLE POST RATING WITH JQUERY AJAX BY CLICKING ON LIKE BUTTON
function two_thousand_twenty_post_like_variables() {
	// Build an array of variables to be used into the post_like function.
	$post_like_vars = array();
	// In this case we are set in a non-login site because we come from another page with Single Sign On.
	// So we take teh user data through the SSO cookie.
	if ( isset($_COOKIE['DataSession']) ) $post_like_vars['user_email'] = $_COOKIE['DataSession']['EmployeeEmail'];
	if ( isset($_POST['post_like']) ) {
		$post_like_vars['nonce'] = $_POST['nonce'];
		$post_like_vars['post_id'] = $_POST['post_id'];
		$post_like_vars['post_like_user'] = get_post_meta( $post_like_vars['post_id'], 'post_like_user' );
		$post_like_vars['post_like_count'] = get_post_meta( $post_like_vars['post_id'], 'post_like_count' );
	}
	return $post_like_vars;
}

function two_thousand_twenty_post_like() {
	$post_like_vars = two_thousand_twenty_post_like_variables();

    if(isset($_POST['post_like'])) {
    	// Check for nonce security
    	if ( !wp_verify_nonce( $post_like_vars['nonce'], 'ajax-nonce' ) )
    	    die ( 'Busted!');
    	
		// Check if current user has already liked this post.
		if ( !in_array( $post_like_vars['user_email'], $post_like_vars['post_like_user'] )) {
			// If not add him as metadata with his cookie-user-email as ID.
			add_post_meta( $post_like_vars['post_id'], 'post_like_user', $post_like_vars['user_email'] );
			// On the other hand we must increase the post like count.
			if( empty( $post_like_vars['post_like_count'] ) ) {
				update_post_meta( $post_like_vars['post_id'], 'post_like_count', 1 );
			} else {
				update_post_meta( $post_like_vars['post_id'], 'post_like_count', ++$post_like_vars['post_like_count'][0] );
			}
			// Message to be retrieve by the ajax success event.
			echo get_post_meta( $post_like_vars['post_id'], 'post_like_count', true );
		} else {
			// If use has already liked the message is 'already'.
			echo 'already';
		}
    }
    exit;
}
// The ajax action would be called post-like in this case because it is written so in myscripts.js.
add_action('wp_ajax_nopriv_post-like', 'two_thousand_twenty_post_like');