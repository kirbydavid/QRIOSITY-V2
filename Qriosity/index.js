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
