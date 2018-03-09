<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">
</head>
<body>
  <div id="app"></div>
  <script src="<?php echo get_template_directory_uri();?>/dist/build.js"></script>
</body>
</html>