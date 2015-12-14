<?php
    require 'config.php';

    $_pass=sha1($_POST['pass']);
    $query = mysql_query("SELECT user FROM gouwu_user WHERE user='{$_POST['user']}' AND pass='{$_pass}'") or die('SQL ´íÎó');
    if (!mysql_fetch_array($query,MYSQL_ASSOC)){
        echo 1;
    }
    mysql_close();
?>