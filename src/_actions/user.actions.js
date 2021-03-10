import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    signin,
    signup,
    logout,
    updateSelf,
    updateUser,
    deleteUser,
    validateToken,
    readOne,
    readAll,
    getAllTeathers,
    getAllStudentsByUser,
    getAllStudentsByPromouter
};

function signin(phonenumber, password) {
    return dispatch => {
        dispatch(request({ phonenumber }));

        userService.signin(phonenumber, password)
            .then(
                response => {
                    const user = {
                        jwt: response.jwt,
                        user: response.user
                    }
                    dispatch(success(user));
                    dispatch(validateToken(response.jwt));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SIGNIN_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNIN_FAILURE, error } }
}

function signup(firstname, lastname, phonenumber, country, sity, password, teather_id, promouter_id) {
    return dispatch => {
        dispatch(request({ phonenumber }));
        userService.signup(firstname, lastname, phonenumber, country, sity, password, teather_id !== undefined ? teather_id : 0, promouter_id !== undefined ? promouter_id : 0)
            .then(
                response => {
                    dispatch(success(response));
                    history.push('/sign-in');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function validateToken(jwt) {
    return dispatch => {
        dispatch(request({ jwt }));

        return userService.validateToken(jwt)
            .then(
                response => {
                    const user = {
                        jwt: jwt,
                        user: response.data
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.VALIDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.VALIDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.VALIDATE_FAILURE, error } }
}

function updateSelf(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, avatar, admin_id, teather_id, promouter_id) {
    return dispatch => {
        dispatch(request({ user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, avatar, admin_id, teather_id, promouter_id }));

        return userService.updateUser(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, admin_id, avatar, teather_id, promouter_id)
            .then(
                data => {
                    localStorage.setItem("user", data.jwt);
                    const user = {
                        jwt: data.jwt,
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
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.USER_UPDATE_REQUEST, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, admin_id, teather_id, avatar } }
    function success(user) { return { type: userConstants.USER_UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_UPDATE_FAILURE, error } }
}


function updateUser(id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, avatar, admin_id, teather, promouter_id) {
    return dispatch => {
        dispatch(request());
        return userService.updateUser(id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, avatar, admin_id, teather === '0' ? '0' : typeof teather === "string" ? teather : teather.id, promouter_id)
            .then(
                data => {
                    const user = {
                        id,
                        firstname,
                        lastname,
                        phonenumber,
                        country,
                        sity,
                        status,
                        access,
                        roles,
                        avatar,
                        admin_id,
                        teather: teather === '0' ? null : teather,
                        promouter_id
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.USER_UPDATE_BY_ID_REQUEST } }
    function success(user) { return { type: userConstants.USER_UPDATE_BY_ID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_UPDATE_BY_ID_FAILURE, error } }
}

function deleteUser(jwt, user_id) {
    return dispatch => {
        dispatch(request({ jwt, user_id }));

        return userService.deleteUser(jwt, user_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USER_DELETE_REQUEST } }
    function success(data) { return { type: userConstants.USER_DELETE_SUCCESS, user_id, data } }
    function failure(error) { return { type: userConstants.USER_UPDATE_BY_ID_FAILURE, error } }
}

function readOne(user_id, jwt) {
    return dispatch => {
        dispatch(request());
        return userService.readOne(user_id, jwt)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETONE_USER_REQUEST } }
    function success(user) { return { type: userConstants.GETONE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETONE_USER_FAILURE, error } }
}

function readAll(jwt) {
    return dispatch => {
        dispatch(request());
        return userService.readAll(jwt)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_USERS_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_USERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_USERS_FAILURE, error } }
}

function getAllTeathers() {
    return dispatch => {
        dispatch(request());

        return userService.getAllTeathers()
            .then(
                teathers => dispatch(success(teathers)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_TEATHERS_REQUEST } }
    function success(teathers) { return { type: userConstants.GETALL_TEATHERS_SUCCESS, teathers } }
    function failure(error) { return { type: userConstants.GETALL_TEATHERS_FAILURE, error } }
}

function getAllStudentsByUser(teather_id) {
    return dispatch => {
        dispatch(request());

        return userService.getAllStudentsByUser(teather_id)
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_STUDENTS_REQUEST } }
    function success(students) { return { type: userConstants.GETALL_STUDENTS_SUCCESS, students } }
    function failure(error) { return { type: userConstants.GETALL_STUDENTS_FAILURE, error } }
}

function getAllStudentsByPromouter(promouter_id, jwt) {
    return dispatch => {
        dispatch(request());

        return userService.getAllStudentsByPromouter(promouter_id, jwt)
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_REQUEST } }
    function success(students) { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_SUCCESS, students } }
    function failure(error) { return { type: userConstants.GETALL_STUDENTS_BY_PROMOUTER_FAILURE, error } }
}