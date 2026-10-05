// JWT token browser se lena
function getToken() {
    return localStorage.getItem("token");
}


// JWT ke saath request bhejna
function authFetch(url, options = {}) {

    const token = getToken();

    if (!options.headers) {
        options.headers = {};
    }

    options.headers["Authorization"] = `Bearer ${token}`;

    return fetch(url, options);
}


// Check karo user login hai ya nahi
function isLoggedIn() {
    return !!getToken();
}


// Logout
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}