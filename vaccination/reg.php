<?php
require_once("_start.php");
function check_numbers($str) {
    for ($i = 0; $i < strlen($str); $i++) {
        if(!strstr("0123456789", $str[$i])) {
            return FALSE;
        }
    }
    return TRUE;
}

//I DON'T KNOW WHY IF I DO CODE BELOW - FOR CHECKING AN UNIQUE EMAIL - USER'S INFO COULDN'T BE WRITTEN INTO users.json.
//$auth -> register IS NOT WORKING!!!

/*$storage_interface_is_crazy = new JSONStorage("users.json");
$users_for_email_checking = $storage_interface_is_crazy->findAll();
$emails = array();
foreach($users_for_email_checking as $u) {
    array_push($emails, $u["email"]);
}*/

$errors = array();
if (count($_POST) > 0)
{
    if (verify_post("reg-name", "reg-ssn", "reg-adr", "reg-email", "reg-pass", "reg-conf-pass")) {
        if (! (trim($_POST["reg-name"]) === "")) {
            if (strlen($_POST["reg-ssn"]) == 9 and check_numbers($_POST["reg-ssn"])) {
                if ($_POST["reg-pass"] === $_POST["reg-conf-pass"]) {
                    /*if(!in_array($_POST["reg-email"], $emails)) {
                        $newID = $auth -> register($_POST["reg-ssn"], $_POST["reg-pass"], $_POST["reg-name"], $_POST["reg-adr"], $_POST["reg-email"]);
                        header("Location: log.php");
                    } else {
                        $str = "Such email already exists! Type another ones!";
                        array_push($errors, $str);
                    }*/
                    $newID = $auth -> register($_POST["reg-ssn"], $_POST["reg-pass"], $_POST["reg-name"], $_POST["reg-adr"], $_POST["reg-email"]);
                    header("Location: log.php");
                } else {
                    $str = "Passwords have to match!";
                    array_push($errors, $str);
                }
            } else {
                $str = "Set SSN correctly! 9 numbers!";
                array_push($errors, $str);
            }
        } else {
            $str = "Set name correctly!";
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
    <?php $l = FALSE; if (verify_post("reg-name", "reg-ssn", "reg-adr", "reg-email", "reg-pass", "reg-conf-pass")) { $l = TRUE; }?>
    <form method="post">
        <p><label for="reg-name"     >Full name</label><input type="text" class="reg-name" id="reg-name" name="reg-name" value="<?php if ($l) echo($_POST["reg-name"]);?>"></p>
        <p><label for="reg-ssn"      >SSN number</label><input type="text" class="reg-ssn" id="reg-ssn" name="reg-ssn" value="<?php if ($l)  echo($_POST["reg-ssn"]);?>"></p>                
        <p><label for="reg-adr"      >Adress</label><input type="text" class="reg-adr" id="reg-adr" name="reg-adr" value="<?php if ($l)  echo($_POST["reg-adr"]);?>"></p>                
        <p><label for="reg-email"    >Email</label><input type="email" class="reg-email" id="reg-email" name="reg-email" value="<?php if ($l)  echo($_POST["reg-email"]);?>"></p>
        <p><label for="reg-pass"     >Password</label><input type="text" class="reg-pass" id="reg-pass" name="reg-pass" value="<?php if ($l)  echo($_POST["reg-pass"]);?>"></p>
        <p><label for="reg-conf-pass">Confirm password</label><input type="text" class="reg-conf-pass" id="reg-conf-pass" name="reg-conf-pass" value="<?php if ($l)  echo($_POST["reg-conf-pass"]);?>"></p>
        <button type="submit">Submit</button>
    </form>
    <div class="errors">
        <?php 
            foreach($errors as $e):
        ?>
            <p><?= $e ?></p>
        <?php endforeach; ?>
    </div>
</center>
</body>
<script src="script.js"></script>

</html>