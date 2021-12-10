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
    if (verify_post('reqName', 'reqNumber')) {
        if (strlen(trim($_POST['reqNumber'])) >= 11) {
            $str = "Имя: " . $_POST['reqName'] . "<br>" .
                   "Телефон: " . $_POST['reqNumber'] . "<br>";
            do_send($str);
            //header('Location: http://xn--80aafmperfkebuggpg0c.xn--p1ai/');

        }
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
    $mail->Subject    = 'Заявка с цифровойтерминал.рф';
    $mail->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
    $mail->MsgHTML($body);
    $mail->CharSet = "utf-8";

    if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
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
        $mail3->Subject    = 'Заявка с цифровойтерминал.рф';
        $mail3->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.
        $mail3->MsgHTML($body3);
        $mail3->CharSet = "utf-8";
        
        $mail3->Send();
    /*$to      = 'Info@stfilin.ru';
    $subject = 'Заявка с цифровыетерминалы.рф';
    $message = $str;
    $headers =  'From: Info@stfilin.ru' . "\r\n" .
                'Reply-To: Info@stfilin.ru' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);*/
}
?>