<?php
include('dbconnection.php'); // Adjust the path to your actual dbconnection file

if (isset($_POST['submit'])) {
    $email = $_POST['email'];
    $username = $_POST['username'];

    // Check if username already exists
    $checkQuery = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($result) > 0) {
        echo "Username already exists.";
    } else {
        // Update user with the new username
        $query = "UPDATE users SET username='$username' WHERE email='$email'";

        if (mysqli_query($conn, $query)) {
            echo "Profile completion successful.";
            // Redirect to an existing page
            header("Location: index.php");
            exit(); // Ensure no further code is executed after the redirect
        } else {
            echo "Profile completion unsuccessful: " . mysqli_error($conn);
        }
    }
}

// Closing the connection
mysqli_close($conn);
?>


<!DOCTYPE html>
<html>
<head>
    <title>Complete Profile</title>
</head>
<body>
    <form method="post" action="complete_profile.php">
        <input type="hidden" name="email" value="<?php echo $_GET['email']; ?>">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit" name="submit">Complete Profile</button>
    </form>
</body>
</html>
