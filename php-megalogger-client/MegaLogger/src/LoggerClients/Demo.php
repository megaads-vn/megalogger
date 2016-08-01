<?php

//namespace LoggerClients;

require("LoggerClient.php");
require("Level.php");

class Demo {

    public function getToken() {
        $apiKey = 'abcesjkje435hjs024kjdsksfsdf_authorkey';
        $token = \LoggerClients\LoggerClient::getToken($apiKey);
        return $token;
    }

    public function postLog() {
        $token = $this->getToken();
        $level = \LoggerClients\Level::getLevelInfo();
        $data = array(
            'data' => 'Data test'
        );
        $response = \LoggerClients\LoggerClient::pushLog($token, $level, $data, 'chiaki_log');
        echo '<pre>';
        print_r($response);
        echo '</pre>';
        die();
    }

}

$d = new Demo();
$d->postLog();
