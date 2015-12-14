<?php
    require 'config.php';
    //在新增之前，要判断用户名是否重复
    $query = mysql_query("SELECT user FROM gouwu_user WHERE
    user='{$_POST['user']}'") or die('SQL 错误');
    if (mysql_fetch_array($query,MYSQL_ASSOC)){
        echo 1;
    }
    mysql_close();
?>