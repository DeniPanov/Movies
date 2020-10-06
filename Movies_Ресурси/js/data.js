function host(endpoint) {
    return `https://api.backendless.com/5124341E-C1E8-EADD-FF8A-AC33C5E13100/F12440F3-6A88-4375-B86B-E8265A2F71FA/${endpoint}`;
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    LOGOUT: "users/logout"
}

async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}

async function login(username, password) {
    return (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
}

function logout() {
    const token = localStorage.getItem("userToken");

    return fetch(host(endpoints.LOGOUT), {
        headers: {
            "user-token": token
        }
    });
}

// get all movies
// get movies by Id
// create movie
// edit movie
// delete movie
// buy ticket
// get movie by Id