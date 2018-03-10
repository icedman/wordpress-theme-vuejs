<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <title><?php bloginfo( 'title' ); ?></title>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">
</head>
<body>
  <div id="app"></div>
  <script>
  var AppOptions = {
    'api_entry': 'http://lechonexpress.com/wp-json',
    'firebase':
<?php echo stripcslashes(get_option('FirebaseAuthentication_Plugin_Firebase_Config','{}')); ?>
  };
  </script>
  <script src="<?php echo get_template_directory_uri();?>/dist/app.js"></script>
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
</body>
</html>
