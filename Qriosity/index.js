document.addEventListener("DOMContentLoaded", function () {
  const passwordInput1 = document.getElementById("PasswordAuth");
  const togglePassword1 = document.getElementById("togglePassword");

  togglePassword1.addEventListener("click", function () {
    // Toggle the type attribute
    const type =
      passwordInput1.getAttribute("type") === "password" ? "text" : "password";
    passwordInput1.setAttribute("type", type);

    // Toggle the eye icon
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  const passwordInput2 = document.getElementById("PasswordAuth2");
  const togglePassword2 = document.getElementById("togglePassword2");

  togglePassword2.addEventListener("click", function () {
    // Toggle the type attribute
    const type =
      passwordInput2.getAttribute("type") === "password" ? "text" : "password";
    passwordInput2.setAttribute("type", type);

    // Toggle the eye icon
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  const passwordInput3 = document.getElementById("PasswordAuth3");
  const togglePassword3 = document.getElementById("togglePassword3");

  togglePassword3.addEventListener("click", function () {
    // Toggle the type attribute
    const type =
      passwordInput3.getAttribute("type") === "password" ? "text" : "password";
    passwordInput3.setAttribute("type", type);

    // Toggle the eye icon
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
});

// Get all the sidebar buttons
const buttons = document.querySelectorAll("#dashboard_SideBar button");

// Loop through each button and add a click event listener
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked button
    this.classList.add("active");

    // Get the target section id from the data-target attribute of the button
    const targetSection = this.getAttribute("data-target");

    // Hide all sections by removing the 'active' class from them
    document.querySelectorAll(".dashboard_Section").forEach((section) => {
      section.classList.remove("active");
    });

    // Show the target section by adding the 'active' class
    document.getElementById(targetSection).classList.add("active");
  });
});

function deleteRow(button) {
  const row = button.parentNode.parentNode.parentNode; // Get the row
  row.parentNode.removeChild(row); // Remove the row from the table body

  // Hide the table if there are no rows
  checkTableVisibility();
}
