<?php

$ip = $_SERVER['REMOTE_ADDR'];
$port = $_SERVER['REMOTE_PORT'];
$host = $_SERVER['REMOTE_HOST'];
$file = 'ip.txt';
$text = file_get_contents($file);
$text .= " ip address is: " . $ip . "user port is port: " . $port . "user host: " . $host . '\n' . '<hr/>';
file_put_contents($file,$text);

?>