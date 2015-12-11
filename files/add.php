<?php
    require 'config.php';

    $_birth = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
    //新增用户
    $query = "INSERT INTO gouwu_user (user, pass,birth,email, shouji)
    VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_birth}', '{$_POST['email']}','{$_POST['shouji']}')";
    @mysql_query($query) or die('新增错误：'.mysql_error());
    echo mysql_affected_rows();
    mysql_close();
?>