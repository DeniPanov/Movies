function host(endpoint) {
    return `https://api.backendless.com/5124341E-C1E8-EADD-FF8A-AC33C5E13100/F12440F3-6A88-4375-B86B-E8265A2F71FA/${endpoint}`;
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    LOGOUT: "users/logout",
    MOVIES: "data/movies",
    MOVIE_BY_ID: "data/movies",
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
    let result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem("user-token", result["user-token"]);
    localStorage.setItem("username", result.username);
    localStorage.setItem("userId", result.objectId);

    return result;
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
async function getAllMovies() {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            "user-token": token
        }
    })).json();
}


// get movies by Id
async function getMoviesById(id) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            "user-token": token
        }
    })).json();
}

// create movie
async function createMovies(movie) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIES), {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(movie)
    })).json();
}

// edit movie
async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        "method": "PUT",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}

// delete movie
async function deleteMovie(id) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        "method": "DELETE",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    })).json();
}

// buy ticket
async function buyTicket(movie) {
    let currentTickets = movie.tickets - 1;
    let movieId = movie.objectId;

    return updateMovie(movieId, { tickets: currentTickets });
}

// get movie by Id
async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endpoints.MOVIES + `where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    })).json();
}