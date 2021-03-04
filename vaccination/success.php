<?php
require_once("_start.php");
if(! isset($_SESSION["user-id"]) || ! $auth -> isAuthenticated()){
    header("Location: index.php");
}
if(count($_POST)>0){
    if(verify_post("logoutBtn")){
        $auth -> logout();
        header("Location: index.php");
    } else if (verify_post("BackBtn")) {
        header("Location: index2.php");
    } else{
        echo("No logout information, please go back to <a href='main.php'>the main page</a>");
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .inp-logout {
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }

        .applied {
           
            padding-top: 5px;
            display: block;
            width: 500px;
            height: 130px;
            background-color: #B3F6CC;
        }
        .applied-header {
            color: #333;
            font-family: sans-serif;
            text-transform: uppercase;
            font-size: 30px;
        }
    </style>
</head>

<body>
    <div class="log-reg">
        <form method="post">
            <input class="inp-logout" type="submit" name="logoutBtn" value="Logout">
            <input class="inp-logout" type="submit" name="BackBtn" value="Back to Calendar">

        </form>
    </div>
    <center>
        <div class="applied">
            <p class="applied-header">Application was created successfully!!!</p>      
        </div>
    </center>
</body>

</html>