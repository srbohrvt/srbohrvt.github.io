<?php

require_once("storage.php");
require_once("auth.php");

session_start();

$auth = new UserStorage();
$storage_apps = new JsonStorage("add.json");

function verify_post(...$inputs) {
    foreach ($inputs as $input) {
        if (!isset($_POST[$input])) {
            return FALSE;
        }
    }
    return TRUE;
}
?>