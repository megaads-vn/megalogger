<?php

namespace LoggerClients;

require 'Http\Http.php';

class LoggerClient {

    public function getToken($apiKey) {
        $params = array('api_key' => $apiKey);
        $url = self::_http()->getBaseUrl() . '/logger/v1/get-token';
        $output = self::_http()->curlExec($url, 'POST', $params);
        $token = '';
        if ($output) {
            $token = $output->token;
        }
        return $token;
    }

    public function pushLog($token = null, $level = null, $data = [], $source = '') {
        $retVal = array(
            'status' => 'failed',
        );
        try {
            if ($level != null && $token != null) {
                $checkVerify = self::_verifyToken($token);
                if ($checkVerify) {
                    $url = self::_http()->getBaseUrl() . '/logger/v1/init-log';
                    $time = time();
                    $ip = self::_http()->getClientIp();
                    $device = self::_http()->getUserAgent();

                    $metaData = array(
                        'language' => 'PHP',
                        'ip' => $ip,
                        'device' => $device
                    );

                    $params = array(
                        'level' => $level,
                        'time' => $time,
                        'source' => $source,
                        'data' => $data,
                        'meta' => $metaData
                    );

                    $output = self::_http()->curlExec($url, 'POST', $params);
                    if ($output) {
                        $retVal['dataTest'] = $output;
                        $retVal['status'] = true;
                    }
                }
            }
        } catch (Exception $ex) {
            $retVal['message'] = $ex->getMessage();
        }
        return $retVal;
    }

    private static function _verifyToken($token) {
        $retVal = false;
        $url = self::_http()->getBaseUrl() . '/logger/v1/verify-token';
        $params = array('token' => $token);
        $output = self::_http()->curlExec($url, 'POST', $params);
        if ($output) {
            if ($output->status == 'successful') {
                $retVal = true;
            }
        }
        return $retVal;
    }

    private static function _http() {
        return new \LoggerClients\Http\Http();
    }

}
