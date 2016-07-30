<?php

class LoggerClients {

    public function init() {
    }

    public static function getToken(){
        $apiKey = 'abcesjkje435hjs024kjdsksfsdf_authorkey';
        $params = array('api_key' => $apiKey);
        $uri = 'http://localhost:2307/logger/v1/get-token';
        $output = self::curlExec($uri, 'POST', $params);
        $token = '';
        if($output){
            $token = $output->token;
        }
        return $token;
    }

    private static function curlExec($uri, $method = 'GET', $params = array()) {
        $channel = curl_init();
        curl_setopt($channel, CURLOPT_URL, $uri);
        curl_setopt($channel, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($channel, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($channel, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($channel, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $response = curl_exec($channel);
        curl_close($channel);
        return json_decode($response);
    }

}

$logger = new LoggerClients();
$logger->getToken();
?>