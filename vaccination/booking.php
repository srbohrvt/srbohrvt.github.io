<?php

require_once("_start.php");

function appID($m, $d, $last) {
    if (strlen($m) == 1)
        $m = 0 . $m;
    if (strlen($d) == 1)
        $d = 0 . $d;
    return "appid" . $m . $d . "-" . $last;
}

$users = $storage->findAll();
$keys = array_keys($users);
$user_id = $_SESSION["user-id"];

$user_name;
$user_adress;
$user_snn;
$user_email;
$user_key_index;
for ($i = 0; $i < count($keys); $i++) {
    if ($keys[$i] == $user_id) {
        $user_key_index = $i;
        $user_name = $users[$keys[$i]]["fullname"];
        $user_adress = $users[$keys[$i]]["adress"];
        $user_snn = $users[$keys[$i]]["ssn"];
        $user_email = $users[$keys[$i]]["email"];
        break;
    }
}

$error = "";

$year;
$month;
$month_for_id;
$day_for_id;
$day;
$time;
$last_id;
$appoint_key;
$date = "";
if(count($_GET) == 5) {
    $year = $_GET["year"];
    $month_for_id = $_GET["month"];
    $month = $_GET["month"]+1;
    $day_for_id = $_GET["day"];
    $day = $_GET["day"];
    $time = $_GET["time"];
    $last_id = $_GET["id"];
    if (strlen($month) == 1)
        $month = 0 . $month;
    if (strlen($day) == 1)
        $day = 0 . $day;
    $date = $year . "-" . $month . "-" .  $day;

    $user_name;
    $user_adress;
    $user_snn;
    $user_email;
    for ($i = 0; $i < count($keys); $i++) {
        if ($keys[$i] == $user_id) {
            $user_name = $users[$keys[$i]]["fullname"];
            $user_adress = $users[$keys[$i]]["adress"];
            $user_snn = $users[$keys[$i]]["ssn"];
            $user_email = $users[$keys[$i]]["email"];

            $appoint_key = appID($month_for_id, $day_for_id, $last_id);
            $users[$keys[$i]]["appoint"] = $appoint_key;
            break;
        }
    }
} else {
    header("Location: index.php");
}
if (count($_POST) != 0)
{
    if (verify_post("date", "time", "name", "adress", "snn", "check")) {
        $storage->update($keys[$user_key_index], $users[$keys[$user_key_index]]);
        $record_where_user_would_be_added = $storage_apps->findById($appoint_key);
        array_push($record_where_user_would_be_added["users"], $keys[$user_key_index]);
        $storage_apps->update($appoint_key, $record_where_user_would_be_added);
        header("Location: success.php");

    } else {
        $error = "Accept terms and conditions!";
    }
}

$users_info = [];
$list_of_users;
$users_arrays = [];
$for_admin_only =  FALSE;
$list_of_needed_keys = []; //keys for the selected date
if ($user_email == "admin@nemkovid.hu")
{
    $for_admin_only =  TRUE;

    $apps_keys = array_keys($storage_apps->findAll());
    foreach ($apps_keys as $akey) {
        if (substr($akey, 0, -1) === substr($appoint_key, 0, -1)) {
            array_push($list_of_needed_keys, $akey);
        }
    }

    foreach($list_of_needed_keys as $ned_key) {
        $record = $storage_apps->findById($ned_key);
        $list_of_users = $record["users"];
        foreach($list_of_users as $l_u) {
            $str = "";

            $apponit_at = $storage_apps->findById($users[$l_u]["appoint"]);
            $apponit_at_time = substr($apponit_at["time"], -5);

            $str = "Full Name:   " . $users[$l_u]["fullname"] . "; SSN:   " . $users[$l_u]["ssn"] . "; E-mail:   " . $users[$l_u]["email"] . ";<br>" . "TIME:    " . $apponit_at_time;

            array_push($users_arrays, $str);
        }
    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        button {
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }
        .inp-logout {
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }
        .header-info {
            display: block;
            width: 200px;
            height: 40px;
            padding-top: 16px;
            text-align: center;
            background-color: rgb(255, 238, 190);
            font-size: 20px;
            text-transform: uppercase;
            margin: 0;
        }

        .info {
            display: block;
            width: 200px;
            height: 20px;
            background: linear-gradient(to bottom, rgb(255, 238, 190), white);
            margin-top: 0;
            margin-bottom: 10px;
        }

        .inp-logout, .dab{ 
            display: inline;
            margin-top: 50px;
            margin-left: 50px;
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }

        .booked-date {
            margin-top: 50px;
        }
    </style>
</head>

<body>
    <!--<div class="log-reg">
        <form method="post">
            <input class="inp-logout" type="submit" name="logoutBtn" value="Logout">
            <button class="dab">Dismiss and back</button>
        </form>
    </div>-->

    <center>
        <div class="booked-date">
            <form method="post">
                <p class="header-info">Appointment on</p><p class="info" id="booked-date"><?= $date ?></p>
                <input type="hidden" name="date" value="<?= $date ?>">
                <p class="header-info">Appointment at</p><p class="info" id="booked-date-time"><?= $time ?></p>
                <input type="hidden" name="time" value="<?= $time ?>">
                <p class="header-info">Your Full Name</p><p class="info" id="user-name"><?= $user_name ?></p>
                <input type="hidden" name="name" value="<?= $user_name ?>">
                <p class="header-info">Your Adress</p><p class="info" id="user-adress"><?= $user_adress ?></p>
                <input type="hidden" name="adress" value="<?= $user_adress ?>">
                <p class="header-info">Your SNN</p><p class="info" id="user-ssn"><?= $user_snn ?></p>
                <input type="hidden" name="snn" value="<?= $user_snn ?>">
                <input type="checkbox" id="book-check" name="check" value="Accept terms and conditions">Accept terms and conditions <br><br>

                <?php if ($for_admin_only == FALSE) { ?>
                <button type="submit" id="confirm">Confirm</button>
                <?php } ?>
            </form>
        </div>
        
        <div style="margin-top: 10px; font-size: 20px; text-transform: uppercase;">
            <?= $error ?>
        </div>

        <div class="for-admin">
            <?php if(count($users_arrays) == 0 and $for_admin_only === TRUE) {
                        echo '<p style="font-size: 25px;">Nobody has applied for this date:  ' . $date . '</p>'; } else if ($for_admin_only === TRUE){ 
                            echo '<p style="font-size: 20px;">For this date:  ' . $date . '  were applied:</p>';
                            ?>
            <ul style="width: 600px">
                <?php foreach($users_arrays as $lu): ?>
                <li><?= $lu ?></li>
                <?php endforeach; ?>
            </ul>
            <?php } ?>
        </div>
    </center>
   
</body>

</html>