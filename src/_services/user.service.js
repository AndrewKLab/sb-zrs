import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    signin,
    signup,
    logout,
    updateUser,
    updateUserById,
    deleteUser,
    validateToken,
    readAll,
    getAllTeathers,
    getAllStudentsByUser
};



function signin(phonenumber, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phonenumber, password })
    };

    return fetch(`/api/login.php`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', response.jwt);

            return response;
        });
}

function signup(firstname, lastname, phonenumber, country, sity, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstname,
            lastname,
            phonenumber,
            country,
            sity,
            password,
            status: "ИСКАТЕЛЬ",
            access: "limited",
            roles: "user",
            avatar: "http://lifestudio-test.ru/assets/img/unnamed.png"
        })
    };

    return fetch(`/api/create_user.php`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response);

            return response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function updateUser(jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jwt,
            firstname,
            lastname,
            phonenumber,
            country,
            sity,
            status,
            access,
            roles,
            teather_id,
            avatar
        })
    };

    return fetch(`/api/update_user.php`, requestOptions).then(handleResponse)
}

function updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jwt,
            firstname,
            lastname,
            phonenumber,
            country,
            sity,
            status,
            access,
            roles,
            teather_id,
            avatar

        })
    };

    return fetch(`/api/update_user_by_id.php?user_id=${user_id}`, requestOptions).then(handleResponse)
}

function deleteUser(jwt, user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
    };
    return fetch(`${config.apiUrl}/user/delete.php?user_id=${user_id}`, requestOptions).then(handleResponse);
}

function validateToken(jwt) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt })
    };

    return fetch(`/api/validate_token.php`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function readAll(jwt) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
    };
    return fetch(`${config.apiUrl}/user/read.php`, requestOptions).then(handleResponse);
}

function getAllTeathers() {
    return fetch(`${config.apiUrl}/read_all_teathers.php`, config.GET).then(handleResponse);
}

function getAllStudentsByUser(teather_id) {
    return fetch(`${config.apiUrl}/read_all_students_by_teather.php?teather_id=${teather_id}`, config.GET).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}