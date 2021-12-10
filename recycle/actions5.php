<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/src/PHPMailer.php';

function verify_post(...$inputs) {
    foreach ($inputs as $input) {
        if (!isset($_POST[$input])) {
            return FALSE;
        } else if (trim($_POST[$input]) == "") {
            return FALSE;
        }
    }
    return TRUE;
}
if (count($_POST) > 0) {
    if (verify_post('presEmail')) {
        $str =  "Презентация отправлена: " . "<br>" .
                "Email: " . $_POST['presEmail'] . "<br>";
        do_send($str);
        //header('Location: http://xn--80aafmperfkebuggpg0c.xn--p1ai/');
    }
}

function do_send($str) {
    //Отправка админу
    $mail             = new PHPMailer();
    $body             = $str;

    $mail->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");
    $mail->SetFrom('Info@stfilin.ru', 'Страховойтерминал.рф');
    $mail->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");

    $address = "Info@stfilin.ru";
    $mail->AddAddress($address);
    $mail->Subject    = 'Презентация с Страховойтерминал.рф';
    $mail->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
    $mail->MsgHTML($body);
    $mail->CharSet = "utf-8";

    if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }




    //отправка клиенту
    $mail2             = new PHPMailer();
    $body             = "Презентация страховойтерминал.рф";

    $mail2->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");
    $mail2->SetFrom('Info@stfilin.ru', 'Страховойтерминал.рф');
    $mail2->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");

    $address = $_POST['presEmail'];
    $mail2->AddAddress($address);
    $mail2->Subject    = 'Презентация с Страховойтерминал.рф';
    $mail2->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
    $mail2->MsgHTML($body);
    $mail2->CharSet = "utf-8";
    $mail2->AddAttachment("pres.pdf"); // pdf file path

    if(!$mail2->Send()) {
        echo "Mailer Error: " . $mail2->ErrorInfo;
    } else {
        echo "Message sent!";
    }    


        //
        $mail3             = new PHPMailer();
        $body3             = $str;
    
        $mail3->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");
        $mail3->SetFrom('Info@stfilin.ru', 'Страховойтерминал.рф');
        $mail3->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");
    
        $address3 = "alex@actix.ru";
        $mail3->AddAddress($address3);
        $mail3->Subject    = 'Презентация с Страховойтерминал.рф';
        $mail3->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
        $mail3->MsgHTML($body3);
        $mail3->CharSet = "utf-8";

        $mail3->Send();
}
/*if (count($_POST) > 0) {
    if (verify_post('question')) {
        $str = "Телефон: " . $_POST['question'];
        do_send($str);
        //header('Location: http://xn--80aafmperfkebuggpg0c.xn--p1ai/');

    }
}

function do_send($str) {
    //Отправка админу
    $mail             = new PHPMailer();
    $body             = $str;

    $mail->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");
    $mail->SetFrom('Info@stfilin.ru', 'Страховойтерминал.рф');
    $mail->AddReplyTo("Info@stfilin.ru","Страховойтерминал.рф");

    $address = "Info@stfilin.ru";
    $mail->AddAddress($address);
    $mail->Subject    = 'Задать вопрос с цифровойтерминал.рф';
    $mail->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
    $mail->MsgHTML($body);
    $mail->CharSet = "utf-8";

    if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }

}*/


?>