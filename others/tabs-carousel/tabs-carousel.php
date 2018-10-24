<!--CODE FROM A WORDPRESS PAGE TEMPLATE-->
<?php if ( have_posts() ) : ?>
	<?php
			$courses_args = array( 'post_type' => 'course' );
			$courses_loop = new WP_Query( $courses_args );
			$prefix = 'qns_';
	?>
	<!-- BEGIN #course-slides -->
	<div  id="course-slides">

		<?php while ( $courses_loop->have_posts() ) : $courses_loop->the_post(); ?>

			<div class="course-panes">

				<ul>
					<li><a class="stop course-slides-stop" href="#course-tabs1">Presentación</a></li>
					<li><a class="stop course-slides-stop" href="#course-tabs2">Objetivos</a></li>
					<li><a class="stop course-slides-stop" href="#course-tabs3">Programa</a></li>
				</ul>

				<?php $title = apply_filters('the_content', get_post_meta(get_the_ID(), $prefix.'course_name', true));  ?>
				<?php $presentation = apply_filters('the_content', get_post_meta(get_the_ID(), $prefix.'course_presentation', true));  ?>
		 		<?php $goals = apply_filters('the_content', get_post_meta(get_the_ID(), $prefix.'course_goals', true));  ?>
		 		<?php $program = apply_filters('the_content', get_post_meta(get_the_ID(), $prefix.'course_program', true));  ?>
				
				<?php if( has_post_thumbnail() ) : ?>

					<div id="course-tabs1">
						<?php $src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'image-style11' ); ?>
                		<?php echo '<img src="' . $src[0] . '" alt="" class="course-image" style="width: 15%;" />'; ?>
						<strong class="course-tabs1-title"><?php echo $title; ?></strong>
						<?php echo substr($presentation, 0, 500); ?>...&nbsp;<a href="<?php the_permalink(); ?>"><b>leer más</b></a>
					</div>

				<?php else : ?>

					<div id="course-tabs1">
						<strong class="course-tabs1-title"><?php echo $title; ?></strong>
						<?php echo substr($presentation, 0, 550); ?>...&nbsp;<a href="<?php the_permalink(); ?>"><b>leer más</b></a>
					</div>

				<?php endif; ?>

				<div id="course-tabs2"><?php echo substr($goals, 0, 550) ; ?>...&nbsp;<a href="<?php the_permalink(); ?>"><b>leer más</b></a></div>
				<div id="course-tabs3"><?php echo substr($program, 0, 550) ; ?>...&nbsp;<a href="<?php the_permalink(); ?>"><b>leer más</b></a></div>

			</div>

		<?php endwhile; ?>
		<a class="slidesjs-previous slidesjs-navigation" href="#"></a>
		<a class="slidesjs-next slidesjs-navigation" href="#"></a>
	<!-- END #course-slides -->
	</div>
<?php endif; ?>