<?php
require_once("_start.php");
if(! isset($_SESSION["user-id"]) || ! $auth -> isAuthenticated()){
    header("Location: index.php");
} else {
    $user = $storage->findById($_SESSION["user-id"]);
    if ($user["email"] != "admin@nemkovid.hu") {
        header("Location: index2.php");
    }
}
$apps = $storage_apps->findAll();


function generate_id($date, $a) {
    $id = "appid";
    $m = intval($date[1]) - 1;
    if ($m < 10) {
        $m = "0" . $m;
    }
    $id = $id . $m . $date[2];
    
    $counter = 0;
    $keys = array_keys($a);
    foreach($keys as $k) {
        if (explode("-", $k)[0] == $id) {
            $counter = $counter + 1;
        }
    }

    $id = $id . "-" . $counter;

    return $id;
} 

$errors = array();
if (count($_POST) > 0)
{
    if (verify_post("date", "time", "slot")) {
        $time = trim($_POST["time"]);
        $ex = explode(":", $time);
        if (! (count($ex) != 2 or strlen($ex[0]) != 2 or strlen($ex[1]) != 2 or intval($ex[0]) > 24 or intval($ex[1]) > 59))
        {
            $slot = $_POST["slot"];
            if ($slot > 0) {
                $date = $_POST["date"];

                $id = generate_id(explode("-", $date), $apps);
                $t = $date . " " . $time;
                $record = [
                    "id"=> $id,
                    "time"=> $t,
                    "slots"=> $slot,
                    "users"=> []
                ];

                $storage_apps->addWithID($id, $record);
                
                header("Location: index2.php");

            } else {
                $str = 'Number of slots must be positive!';
                array_push($errors, $str);
            }

        } else {
            $str = 'Time format is incorrect! Examples: "08:00" or "16:30" or "22:00"';
            array_push($errors, $str);
        }

    } else {
        $str = "Not every field has been set! All of them are required!";
        array_push($errors, $str);
    }
} else {
    $str = "You can't send empty form, not in my time! XD";
    array_push($errors, $str);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
<center>
    <?php ?>
    <form method="post">
        <p><label for="date">Select date</label><input type="date" class="date" name="date" value="<?php echo($_POST["date"]);?>"></p>
        <p><label for="time">Enter time</label><input type="text" class="time" name="time" maxlength="5" placeholder="--:--" value="<?php echo($_POST["time"]);?>"></p>
        <p><label for="slot">Number of slots</label><input type="number" class="slot" name="slot" value="<?php echo($_POST["slot"]);?>"></p>
        <button type="submit">Submit</button>
    </form>

    <div calss="errors">
        <?php 
            foreach($errors as $e):
        ?>
            <p><?= $e ?></p>
        <?php endforeach; ?>
    </div>
</center>
</body>

</html>