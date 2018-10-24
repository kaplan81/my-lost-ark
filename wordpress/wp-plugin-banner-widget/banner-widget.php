<?php
/*
Plugin Name: Banner Widget
Description: Provides a widget for displayable banner.
Version: 1.0
Author: Andres Gesteira
*/

class Banner extends WP_Widget {
    function __construct() {
    	parent::__construct(
	        // Base ID of the widget
	        'banner',
	        // Name of the widget
	        'Banner Widget',
	        // Widget options
	        array (
	            'description' => 'Creates an area for a banner to be enabled or disabled.'
	        )
	    );
    }
    // Creates the form in the Widgets screen that lets users customise or activate the widget.
    function form( $instance ) {
    	if ( !isset($instance['news']) ) $instance['news'] = '';
    	if ( !isset($instance['news-link']) ) $instance['news-link'] = '';
    	// $defaults = array(
    	//         'news' => '',
    	//         'news-link' => ''
    	//     );
	    $news = $instance[ 'news' ];
	    $news_link = $instance[ 'news-link' ];

	    // Markup for form ?>
	    <p>
	        <label for="<?php echo $this->get_field_id( 'news' ); ?>">Ad:</label>
	        <input class="widefat" type="text" id="<?php echo $this->get_field_id( 'news' ); ?>" name="<?php echo $this->get_field_name( 'news' ); ?>" value="<?php echo esc_attr( $news ); ?>">
	    </p>

	    <p>
	        <label for="<?php echo $this->get_field_id( 'news-link' ); ?>">Link of the add*:</label>
	        <input class="widefat" type="text" id="<?php echo $this->get_field_id( 'news-link' ); ?>" name="<?php echo $this->get_field_name( 'news-link' ); ?>" value="<?php echo esc_attr( $news_link ); ?>">
	        <sub>*Complete URL</sub>
	    </p>
    	<?php
    }
    // Ensures that WordPress updates any settings that users input in the Widgets screen.
    function update( $new_instance, $old_instance ) { 
    	$instance = $old_instance;
	    $instance[ 'news' ] = strip_tags( $new_instance[ 'news' ] );
	    $instance[ 'news-link' ] = strip_tags( $new_instance[ 'news-link' ] );
	    return $instance;     
    }
    // Defines what's output by the widget on the front end of the site.
    function widget( $args, $instance ) {
        extract( $args );
        // echo $before_title . $instance['news'] . $after_title;       
        echo '<strong>&nbsp;' . $instance['news'] . '</strong><a href="' . $instance['news-link'] . '">Mostrar detalles</a>';
    }
}

function banner_register_widget_init() {
    register_sidebar( array(
    	'name'          => 'Banner Area',
    	'id'            => 'banner-widget-area',
    	'before_widget' => '',
    	'after_widget'  => '',
    	'before_title'  => '',
    	'after_title'   => '',
    ) );
    register_widget( 'Banner' );
}
add_action( 'widgets_init', 'banner_register_widget_init' );