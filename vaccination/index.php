<?php
require_once("_start.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        button {
            margin: 20px;
            width: 150px;
            height: 50px;
            background-color:rgb(253, 232, 175);
        }
    </style>
</head>

<body>
    <button class="log" id="toLog">Log in</button>
    <button class="reg" id="toReg">Register</button>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="log-reg">
            <center>
                <button class="log1" id="toLog1">Log in</button>
                <button class="reg1" id="toReg1">Register</button>
            </center>
            </div>
        </div>
    </div>

        <!--<div id="myModal1" class="modal1">
            <div class="modal-content1">
                <span class="close1">&times;</span>
                <iframe src="reg.php">
                </iframe>
            </div>
        </div>-->
    <center><p class="intro" style="margin-bottom: 40px;">The National Health Centre organizes vaccinations at various times in its central building. <br>
    Here you can schedule an appointment for a coronavirus vaccination.</p>
    <p style="text-decoration:underline;font-family: sans-serif; font-size: 20px; text-transform:uppercase;">On the each time slot can come only 1 person!</p></center>
    <div id="newDiv"></div>
    <center><button class="months" id="toPrevMonth">To Previous<br>month</button>
    <button class="months" id="toNextMonth">To Next<br>month</button></center>
</body>
<script src="script.js"></script>

</html>