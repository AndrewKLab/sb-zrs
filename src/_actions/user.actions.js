import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    signin,
    signup,
    logout,
    updateUser,
    updateUserById,
    validateToken,
    getAllTeathers,
    getAllStudentsByUser
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

function signup(firstname, lastname, phonenumber, country, sity, password) {
    return dispatch => {
        dispatch(request({ phonenumber }));

        userService.signup(firstname, lastname, phonenumber, country, sity, password)
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

function updateUser(jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar) {
    return dispatch => {
        dispatch(request({ jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar }));

        return userService.updateUser(jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar)
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

    function request() { return { type: userConstants.USER_UPDATE_REQUEST, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar } }
    function success(user) { return { type: userConstants.USER_UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_UPDATE_FAILURE, error } }
}


function updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar) {
    return dispatch => {
        dispatch(request({ user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar }));

        return userService.updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar)
            .then(
                data => {
                    const user = {
                        user_id,
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

    function request() { return { type: userConstants.USER_UPDATE_BY_ID_REQUEST, jwt, firstname, lastname, phonenumber, country, sity, status, access, roles, teather_id, avatar } }
    function success(user) { return { type: userConstants.USER_UPDATE_BY_ID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_UPDATE_BY_ID_FAILURE, error } }
}

function getAllTeathers() {
    return dispatch => {
        dispatch(request());

        userService.getAllTeathers()
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