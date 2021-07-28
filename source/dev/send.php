<?php
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
$message;

if ($name) {
	$message .= "\nИмя: $name";
}
if ($phone) {
	$message .= "\nТелефон: $phone";
}

$to = "zakaz@vsevidnorf.ru";
$headers = "Content-type: text/plain; charset = UTF-8";
$subject = "Новая заявка с сайта";
$send = mail($to, $subject, $message, $headers);
?>