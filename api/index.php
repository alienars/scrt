<?php

include_once 'config.php';
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];


function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function generateRandomString($length = 8)
{
    global $db;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    };
    $checkrandcurlexist = $db->prepare("SELECT 1 FROM secret where s_curl = '$randomString'");
    $checkrandcurlexist->execute();
    if ($checkrandcurlexist->rowCount() > 0) {
        generateRandomString();
    } else {
        return $randomString;
    }
}


if(isset($_SERVER['HTTP_ORIGIN'])){
    $requestOrigin = $_SERVER['HTTP_ORIGIN'];
}else{
    $requestOrigin = 0;
}

if (in_array($requestOrigin, $allowedOrigins) && !$requestOrigin == 0) {

    header('Access-Control-Allow-Origin: ' . $requestOrigin);
    header('Access-Control-Allow-Methods: GET, POST, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');

    if (isset($_POST['action'])) {
        if ($_POST['action'] == 'save_secret') {
            $oneTime = test_input($_POST['oneTime']);
            $key = test_input($_POST['key']);
            $text = test_input($_POST['text']);
            $curl = test_input($_POST['curl']);
            $curlLength = strlen($curl);
            $curlStandards = array(8, 16, 24, 32);

            if (in_array($curlLength, $curlStandards)) {
                $insertTxt = $db->prepare("INSERT INTO secret (s_time, s_key, s_text, s_curl) VALUES ('$oneTime','$key','$text','$curl');");
                $insertTxt->execute();
                $insertTxtValue = $insertTxt->fetch(PDO::FETCH_OBJ);
                $object = new stdClass();
                $object->status = 'success';
                $object->url = $website_url . $curl;
                echo json_encode($object);
            } else {
                $object = new stdClass();
                $object->status = 'fail';
                $object->text = 'url length invalid';
                echo json_encode($object);
            }
        }
        if ($_POST['action'] == 'get_secret') {
            $G_curl = test_input($_POST['g_curl']);
            $G_key = test_input($_POST['key']);
            $checkcurlexist = $db->prepare("SELECT 1 FROM secret where s_curl = '$G_curl'");
            $checkcurlexist->execute();
            if ($checkcurlexist->rowCount() > 0) {
                $checkcurlpass = $db->prepare("SELECT s_key FROM secret where s_curl = '$G_curl'");
                $checkcurlpass->execute();
                $checkcurlpassValue = $checkcurlpass->fetch(PDO::FETCH_OBJ);
                if ($checkcurlpassValue->s_key == $G_key) {
                    $checkcurltext = $db->prepare("SELECT s_text FROM secret where s_curl = '$G_curl'");
                    $checkcurltext->execute();
                    $checkcurltextValue = $checkcurltext->fetch(PDO::FETCH_OBJ);
                    $object = new stdClass();
                    $object->status = 'success';
                    $object->text = $checkcurltextValue->s_text;
                    echo json_encode($object);
                    $checkcurltime = $db->prepare("SELECT s_time FROM secret where s_curl = '$G_curl'");
                    $checkcurltime->execute();
                    $checkcurltimeValue = $checkcurltime->fetch(PDO::FETCH_OBJ);
                    if ($checkcurltimeValue->s_time == 'true') {
                        $deleterow = $db->prepare("DELETE FROM secret where s_curl = '$G_curl'");
                        $deleterow->execute();
                    } else {
                    }
                } else {
                    $object = new stdClass();
                    $object->status = 'fail';
                    $object->text = 'Password Wrong!';
                    echo json_encode($object);
                }
            } else {
                $object = new stdClass();
                $object->status = 'fail';
                $object->text = 'Not Found!';
                echo json_encode($object);
            }
        };
        if ($_POST['action'] == 'delete_secret') {
            $G_curl = test_input($_POST['g_curl']);
            $deleterow = $db->prepare("DELETE FROM secret where s_curl = '$G_curl'");
            $deleterow->execute();
            $object = new stdClass();
            $object->status = 'success';
            $object->text = 'deleted';
            echo json_encode($object);
        }
    }
} else {
    header('HTTP/1.1 403 Forbidden');
    echo 'Unauthorized access : ';
    if(!$requestOrigin == 0){
        echo $_SERVER['HTTP_ORIGIN'];
    }else{
        echo $_SERVER['HTTP_USER_AGENT'];
    }
 
}