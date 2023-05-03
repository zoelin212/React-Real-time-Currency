<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $content = file_get_contents('https://tw.rter.info/capi.php');
    $currency = json_decode($content, true);

    // drop some currencies
    $remove_currencies = ['DOGE', 'ECS', 'FRF', 'IEP', 'ITL', 'LTC', 'MXV', 'SIT', 'SSP', 'X', 'XAF', 'XAG', 'XAU', 'XDR', 'XPD', 'XPF', 'XPT', 'PERHIGHGRADE', 'LADIUM1OZ', 'TINUM1UZ999', 'VER1OZ999NY','', 'MRU','CNH', 'HUX', 'STN'];

    // unset() for removed
    foreach ($currency as $key => $value) {
        $currency_code = substr($key, 3);
        if (in_array($currency_code, $remove_currencies)) {
            unset($currency[$key]);
        }
    }

    // A~Z
    uksort($currency, 'strnatcasecmp');

    // store currency as an array
    $currency_codes = array();
    foreach ($currency as $key => $value) {
        $currency_codes[] = substr($key, 3);
    }



    $response = array("currency_codes" => $currency_codes, "rate" => $currency);
    echo json_encode($response);
?>