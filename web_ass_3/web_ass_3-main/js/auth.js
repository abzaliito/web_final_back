const API_URL = "http://localhost:8080/api/auth/";

function login(username, password) {
    return fetch(API_URL + "signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || "Login failed") });
            }
            return response.json();
        })
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem("user", JSON.stringify(data));
            }
            return data;
        })
        .catch(err => {
            console.error(err);
            alert("Ошибка входа: " + err.message);
            throw err;
        });
}

function register(username, email, password) {
    return fetch(API_URL + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || "Registration failed") });
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            alert("Ошибка регистрации: " + err.message);
            throw err;
        });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


function getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
}

// UI Update Logic
document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();
    const navContainer = document.querySelector(".navbar-collapse .d-flex");

    if (navContainer) {
        if (user) {
            // User is logged in
            let adminLink = "";
            if (user.roles && user.roles.includes("ROLE_ADMIN")) {
                adminLink = `<li><a class="dropdown-item" href="admin.html">Админ Панель</a></li>`;
            }

            const userHtml = `
        <div class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            ${user.username}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            ${adminLink}
            <li><a class="dropdown-item" href="profile.html">Профиль</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item text-danger" id="logoutBtn">Выйти</button></li>
          </ul>
        </div>
      `;
            navContainer.insertAdjacentHTML("beforeend", userHtml);

            document.getElementById("logoutBtn").addEventListener("click", logout);
        } else {
            // User is not logged in
            const authHtml = `
        <a href="login.html" class="btn btn-outline-light me-2">Войти</a>
        <a href="register.html" class="btn btn-warning">Регистрация</a>
      `;
            navContainer.insertAdjacentHTML("beforeend", authHtml);
        }
    }
});
