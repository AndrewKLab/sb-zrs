import config from 'config';

export const userService = {
    signin,
    signup,
    logout,
    updateUser,
    deleteUser,
    validateToken,
    readOne,
    readAll,
    getAllTeathers,
    getAllStudentsByUser,
    getAllStudentsByPromouter,
    createUserDevice,
    getUserRoles
};



function signin(phonenumber, password, dvc_platform, dvc_client, dvc_signature, dvc_fbc_token, dvc_active) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            phonenumber,
            password,
            dvc_platform,
            dvc_client,
            dvc_signature,
            dvc_fbc_token,
            dvc_active
        })
    };

    return fetch(`/api/login.php`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', response.jwt);

            return response;
        });
}

function signup(firstname, lastname, phonenumber, country, sity, password, teather_id, promouter_id) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            firstname,
            lastname,
            phonenumber,
            country,
            sity,
            password,
            teather_id,
            promouter_id,
            status: "ИСКАТЕЛЬ",
            access: "limited",
            roles: "user",
            avatar: `${config.apiUrl}/assets/img/unnamed.png`
        })
    };

    return fetch(`${config.apiUrl}/user/create.php`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response);

            return response;
        });
}

function logout(token, dvc_signature, dvc_fbc_token) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            dvc_signature,
            dvc_fbc_token
        })
    };

    return fetch(`/api/logout.php`, requestOptions).then(handleResponse)

    //localStorage.removeItem('FBCtoken');
}

function updateUser(token, user) {
const userData = {
    ...user, 
    admin_id: typeof user.admin === "object" ? user.admin.id : user.admin_id !== undefined ?  user.admin_id : 0,
    teather_id: typeof user.teather === "object" ? user.teather.id : user.teather_id !== undefined ?  user.teather_id : 0,
    //promouter_id: typeof user.promouter === "object" ? user.promouter.id : 0
}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(userData)
    };

    return fetch(`/api/user/update.php?user_id=${userData.id}`, requestOptions).then(handleResponse)
}

function deleteUser(jwt, user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${jwt}` }
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

function readOne(user_id, jwt) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
    };
    return fetch(`${config.apiUrl}/user/read_one_user.php?user_id=${user_id}`, requestOptions).then(handleResponse);
}

function readAll(jwt) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
    };
    return fetch(`${config.apiUrl}/user/read.php`, requestOptions).then(handleResponse);
}

function getAllTeathers() {
    return fetch(`${config.apiUrl}/read_all_teathers.php`, config.GET).then(handleResponse);
}

function getAllStudentsByUser(teather_id) {
    return fetch(`${config.apiUrl}/read_all_students_by_teather.php?teather_id=${teather_id}`, config.GET).then(handleResponse);
}

function getAllStudentsByPromouter(promouter_id, jwt) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
    };
    return fetch(`${config.apiUrl}/user/read_all_students_by_promouter.php?promouter_id=${promouter_id}`, requestOptions).then(handleResponse);
}

function createUserDevice(token, dvc_user_id, dvc_platform, dvc_client, dvc_signature, dvc_fbc_token, dvc_active) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            dvc_user_id,
            dvc_platform,
            dvc_client,
            dvc_signature,
            dvc_fbc_token,
            dvc_active
        })
    };
    return fetch(`/api/user/user_devices/create_user_device.php`, requestOptions).then(handleResponse);
}
function getUserRoles(token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    };
    return fetch(`/api/user/user_roles/get_user_roles.php`, requestOptions).then(handleResponse);
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