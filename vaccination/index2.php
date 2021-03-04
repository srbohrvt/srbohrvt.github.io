<?php
require_once("_start2.php");
$storage2 = new JsonStorage("users.json");

$user_has_been_applied = FALSE;
$users_time = "";
if(! isset($_SESSION["user-id"]) || ! $auth -> isAuthenticated()){
    header("Location: index.php");
} else {
    $user = $storage2->findById($_SESSION["user-id"]);
    if ($user["appoint"] != "") {
        $user_has_been_applied = TRUE;
        $appoint_id = $user["appoint"];

        $record = $storage_apps->findById($appoint_id);
        $users_time = $record["time"];
    }
}
if(count($_POST)>0){
    if(verify_post("logoutBtn")){
        $auth -> logout();
        header("Location: index.php");
    } else if (verify_post("cancel")) {
        $user = $storage2->findById($_SESSION["user-id"]);
        $apps = $storage_apps->findById($user["appoint"]);
        foreach($apps["users"] as $key => $item){
            if ($item == $_SESSION["user-id"]){
              unset($apps["users"][$key]);
            }
        }
        $storage_apps->update($user["appoint"], $apps);
        $user["appoint"] = "";
        $storage2->update($_SESSION["user-id"], $user);
        header("Location: index2.php");

    } else {
        echo("No logout information, please go back to <a href='main.php'>the main page</a>");
    }
}
$users = $storage2->findAll();
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

$admin = FALSE;
if ($user_email == "admin@nemkovid.hu")
{
    $admin = TRUE;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        button {
            margin: 50px;
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }
        .newdate {
            position: absolute;

            display: inline-block;
            margin-left: 50px;
            margin-top: 10px;
            padding: 15px 25px 15px 25px;
            background-color:rgb(253, 232, 175);
            text-decoration: none;
        }
        
        .inp-logout {
            
            margin-left: 50px;
            margin-top: 10px;
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }

        .applied {
            padding-top: 5px;
            display: block;
            width: 300px;
            background-color: #B3F6CC;
        }
        .applied-header {
            color: #333;
            font-family: sans-serif;
            text-transform: uppercase;
            font-size: 20px;
        }
        .applied-header1 {
            color: red;
            font-family: sans-serif;
            text-transform: uppercase;
            font-size: 20px;
        }
        .extra-noticeble {
            display: block;
            background-color: #FF527B;
            color: whitesmoke;
            font-family: sans-serif;
            text-transform: uppercase;
            font-size: 20px;
            font-weight: 600;

            height: 25px;
        }
        .cancel {
            width: 200px;
            height: 30px;
            background-color:whitesmoke;
            margin-top: 10px;
            margin-bottom: 10px;
            border: none;
            text-transform: uppercase;
            color: #1e1e1e;
        }
    </style>
</head>

<body>
    <div class="log-reg">
        <form method="post">
            <input class="inp-logout" type="submit" name="logoutBtn" value="Logout">
        </form>
    </div>
    <?php if ($admin == TRUE) {?>
        <div class="add-new-date">
            <a class="newdate" href="newdate.php">Post a new date</a>
        </div>
    <?php } else { ?>
        <p style="display: none;" id="isAdmin">no</p>
    <?php } ?>
    <?php if ($user_has_been_applied == TRUE) {?>
        <center>
            <div class="applied">
                <p class="applied-header">You has already been applied!</p>
                <p class="applied-header1">Your vaccination date:</p>
                <div class="extra-noticeble">
                    <?= $users_time ?>
                </div>
                <form method="post">
                    <input type="submit" name="cancel" class="cancel" value="CANCEL APPOINTMENT">
                </form>
            </div>
        </center>
    <?php } ?>
    <center><p class="intro" style="margin-bottom: 40px;">The National Health Centre organizes vaccinations at various times in its central building. <br>
    Here you can schedule an appointment for a coronavirus vaccination.</p> <p style="text-decoration:underline;font-family: sans-serif; font-size: 20px; text-transform:uppercase;">On the each time slot can come only 1 person!</p></center>
    <div id="newDiv"></div>
    <center><button class="months" id="toPrevMonth">To Previous<br>month</button>
    <button class="months" id="toNextMonth">To Next<br>month</button></center>

    <?php if ($admin == TRUE) {?>
        <p style="display: none;" id="isAdmin">yes</p>
    <?php } else { ?>
        <p style="display: none;" id="isAdmin">no</p>
    <?php } ?>
    
</body>
<script src="script2.js"></script>

</html>