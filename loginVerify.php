<?php

$usernameVer = $_POST['username'];
$passwordVer = $_POST['password'];

$servername = "107.180.1.16:3306";
$username = "fall2021group3";
$password = "group3fall2021";
$db = "cis440fall2021group3";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error){
	die("Connection failed: ". $conn->connect_error);
}

$sql = "select aAdviceGiverID from AdviceGiver where aUsername = '$usernameVer' and aPassword = '$passwordVer'";

$result = $con->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc() ){
        echo $row["aAdviceGiverID"];
    }
} else {
    echo "0";
}

$conn->close();

?>