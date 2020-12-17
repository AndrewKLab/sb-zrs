import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    signin,
    signup,
    logout,
    validateToken,
    getAll
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

function validateToken(jwt){
    return dispatch => {
        dispatch(request({ jwt }));

        userService.validateToken(jwt)
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

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}