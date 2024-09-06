<?php
  include('dbconnection.php'); 

  if (isset($_POST['register'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Check if email already exists
    $checkQuery = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($result) > 0) {
        echo "Email already exists.";
    } else {
        // Insert new user with a placeholder for username
        $query = "INSERT INTO users (email, password, username) VALUES ('$email', '$password', '')";

        if (mysqli_query($conn, $query)) {
            echo "Registration successful. Please complete your profile.";
            // Redirect to profile completion page
            header("Location: complete_profile.php?email=$email");
        } else {
            echo "Registration unsuccessful: " . mysqli_error($conn);
        }
    }
  }

  // Closing the connection
  mysqli_close($conn);
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QRIOSITY | A Fitness WebApp</title>

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />

    <!-- FontAwesome Icon Kit -->
    <script
      src="https://kit.fontawesome.com/8966b11bb7.js"
      crossorigin="anonymous"
    ></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- External CSS -->
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <!-- Header -->
    <div id="topBarHeader">
      <header class="header d-flex justify-content-between align-items-center">
        <div id="TopbarNav">
          <a class="nav-link" href="#front">
            <strong class="styled">QRIOSITY</strong>
            <p id="tagline">| A Smart Packaging WebApp</p>
          </a>
        </div>

        <!-- Navigation -->
        <nav id="navHeader">
          <a class="nav-link" href="#about">About</a>
          <button
            type="button"
            class="btn btn-light ms-3 hoverButton"
            data-bs-toggle="modal"
            data-bs-target="#authModal"
            id="signInButton"
          >
            Sign In
          </button>
          <div class="dropdown">
            <button
              type="button"
              class="btn btn-light ms-3 hoverButton"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa-regular fa-user"></i>
              kirby
            </button>

            <div class="dropdown-menu" aria-labelledby="profileDropdown">
              <button class="btn btn-light dropdown-item" type="button">
                <i class="fa-regular fa-flag"></i> | Profile
              </button>
              <button
                class="btn btn-light dropdown-item"
                type="button"
                data-bs-target="#dashboardModal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-paperclip"></i> | Dashboard
              </button>
              <button class="btn btn-light dropdown-item" type="button">
                <i class="fa-solid fa-right-from-bracket"></i> | Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
    <!-- HEADER -->

    <!-- SIGN IN / SIGN UP FORM -->

    <!-- Sign In Modal -->
    <div
      class="modal fade formModal"
      id="authModal"
      tabindex="-1"
      aria-labelledby="ingredientModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="signInTitle">Welcome!</h3>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div class="modal-body">
              <div class="mb-3">
                <label for="EmailAuth" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="EmailAuth"
                  placeholder="name@example.com"
                />
              </div>

              <div class="mb-3">
                <label for="PasswordAuth" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="PasswordAuth"
                  placeholder="Enter Password"
                />
                <i
                  class="fas fa-eye-slash toggle-password"
                  id="togglePassword"
                ></i>
              </div>

              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="remember-me"
                />
                <label class="form-check-label" for="remember-me"
                  >Remember me</label
                >
              </div>

              <div id="signIn">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="signInSwitch"
                >
                  Sign In
                </button>
              </div>

              <small class="centerSmall"> or continue with</small>

              <div class="social-icons">
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-google"></i></a>
                <a href="#"><i class="fa-brands fa-github"></i></a>
              </div>

              <div class="alternative">
                <small class="centerSmall">
                  Not a member?
                  <button
                    type="button"
                    class="btn btn-link"
                    data-bs-target="#registerModal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Sign Up!
                  </button>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- SIGN UP MODAL -->
    <div
      class="modal fade formModal"
      id="registerModal"
      tabindex="-1"
      aria-labelledby="ingredientModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="signInTitle">Sign up!</h3>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form method="post">
            <div class="modal-body">
              <div class="mb-3">
                <label for="EmailAuth" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="EmailAuth"
                  name="email"
                  placeholder="name@example.com"
                />
              </div>

              <div class="mb-3">
                <label for="PasswordAuth2" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="PasswordAuth2"
                  name="password"
                  placeholder="Enter Password"
                />
                <i
                  class="fas fa-eye-slash toggle-password"
                  id="togglePassword2"
                ></i>
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="PasswordAuth3"
                  placeholder="Enter Password Again"
                />
                <i
                  class="fas fa-eye-slash toggle-password"
                  id="togglePassword3"
                ></i>
              </div>

              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="remember-me"
                />
                <label class="form-check-label" for="remember-me"
                  >Remember me</label
                >
              </div>

              <div id="signIn">
                <button
                  type="submit"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="signInSwitch"
                  name="register"
                >
                  Register
                </button>
              </div>

              <small> or continue with</small>

              <div class="social-icons">
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-google"></i></a>
                <a href="#"><i class="fa-brands fa-github"></i></a>
              </div>

              <div class="alternative">
                <small>
                  Already a member?
                  <button
                    type="button"
                    class="btn btn-link"
                    data-bs-target="#authModal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Sign In!
                  </button>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- SIGN IN / SIGN UP FORM -->

    <!-- DASHBOARD -->
    <div
      class="modal fade"
      id="dashboardModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen" id="dashboardModalBox">
        <div class="modal-content">
          <div id="dashboard_Content">
            <div id="dashboard_SideBar">
              <!-- SIDE BARS -->
              <p class="dashboard_Divider">Dashboard</p>
              <button><i class="fa-solid fa-list"></i>Summary</button>
              <button><i class="fa-solid fa-paper-plane"></i>Items</button>
              <button>
                <i class="fa-solid fa-chart-simple"></i>Performance
              </button>
              <p class="dashboard_Divider">Support</p>
              <button><i class="fa-solid fa-gear"></i>Settings</button>
              <button><i class="fa-solid fa-circle-question"></i>Help</button>
              <!-- SIDE BARS -->
            </div>

            <div id="dashboard_MainContent">
              <!-- ITEM TABS -->

              <div id="dashboard_Items">
                <div id="dashboard_Items_Header">
                  <div id="db_item">
                    <h5>0 Current Items</h5>
                  </div>
                  <div id="dashboard_Items_Categories">
                    <div id="dashboard_Items_Categories_List">
                      <button class="btn db_categ_but">Category 1</button>
                      <button class="btn db_categ_but">Category 2</button>
                      <button class="btn db_categ_but">Category 3</button>
                    </div>
                    <button
                      id="dashboard_Items_Categories_Create"
                      class="btn btn-light"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div id="dashboard_Items_List">
                  <table class="table" id="ingredientsTable">
                    <tbody id="ingredientsList">
                      <tr>
                        <div class="itemTemplate">
                          <div class="itemTemplate_left">
                            <button class="iconButton">
                              <i class="fa-solid fa-qrcode iconButton"></i>
                            </button>

                            <p class="dashboard_Items_itemTitle">
                              Pancit canton
                              <br />
                              <small class="dashboard_Items_Data date"
                                >9/2/2024</small
                              >
                            </p>
                          </div>

                          <div class="itemTemplate_right">
                            <div>
                              <small class="light"> Serving </small>
                              <br />

                              <p class="highlight">1 serving</p>
                            </div>

                            <div>
                              <small class="light"> Calories </small>
                              <br />

                              <p class="highlight">1000 Calories</p>
                            </div>

                            <div>
                              <small class="light"> Weight </small>
                              <br />

                              <p class="highlight">50g</p>
                            </div>
                            <div>
                              <small class="light"> Food Group </small>
                              <br />

                              <p class="highlight">Fruits</p>
                            </div>

                            <button
                              class="iconButton"
                              type="button"
                              class="btn"
                              id="profileDropdown"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>

                            <div class="dropdown-menu">
                              <button
                                class="btn btn-light dropdown-item"
                                type="button"
                              >
                                <i class="fa-solid fa-pen-to-square"></i> | Edit
                              </button>
                              <button
                                class="btn btn-light dropdown-item"
                                type="button"
                              >
                                <i class="fa-solid fa-trash"></i> | Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- ITEM TABS -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DASHBOARD -->

    <!-- Main Sections -->
    <section id="front">
      <h1 id="gradientText">Edward</h1>
    </section>

    <section id="about">
      <h2>
        A smart packaging web application that uses QR codes to provide detailed
        information about products, including descriptions, origin, ingredients,
        expiry dates, allergens, and more.
      </h2>
    </section>

    <!-- External JS -->
    <script src="index.js"></script>
    <!-- Bootstrap JS -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
