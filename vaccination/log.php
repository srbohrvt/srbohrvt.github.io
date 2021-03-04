<?php
require_once("_start.php");

$errors = array();
if (count($_POST) > 0)
{
    if (verify_post("log-email", "log-pass")) {
        $userID = $auth -> authenticate($_POST["log-email"], $_POST["log-pass"]);
        if($userID){
            $auth -> login($userID);
            header("Location: index2.php");
        }else{
            $str = "No such user or bad password!";
            array_push($errors, $str);
        }
    } else {
        $str = "Not every field has been set";
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
    <?php $l = FALSE; if (verify_post("log-email", "log-pass")) { $l = TRUE; }?>
    <form method="post">
        <p><label for="log-email">Your Email</label><input type="email" class="log-email" id="log-email" name="log-email" value="<?php if ($l) echo($_POST["log-email"]);?>"></p>
        <p><label for="log-pass">Your password</label><input type="text" class="log-pass" id="log-pass" name="log-pass" value="<?php if ($l) echo($_POST["log-pass"]);?>"></p>
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
<!--<script src="script.js"></script>-->

</html>