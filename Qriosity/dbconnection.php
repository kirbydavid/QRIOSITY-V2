<?php
    $conn = mysqli_connect("localhost", "root", "", "qriositydb");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>
