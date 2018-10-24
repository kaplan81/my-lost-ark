<header>

  <?php if ( is_active_sidebar( 'banner-widget-area' ) ) : ?>
    <div class="banner-top">
      <div class="container">
        <div class="row" style="padding-left: 15px;">
          <h5 class="pull-left">ADD: <?php dynamic_sidebar('banner-widget-area'); ?></h5>
        </div>
      </div>
    </div>
  <?php endif; ?>

</header>