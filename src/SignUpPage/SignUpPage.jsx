import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import { Link } from 'react-router-dom';

import {
    Avatar,
    Button,
    Alert,
    Checkbox,
    FormControlLabel,
    Typography,
    TextInput,
    IconButton,
    Grid
} from '../_components';
import config from 'config';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

let SignupSchema = yup.object().shape({


    firstname: yup.string().required("Это поле является обязательным для заполнения."),

    phonenumber: yup
        .string()
        .min(10, "Этот номер слишком короткий.")
        .max(10, "Этот номер слишким длинный.")
        .matches(phoneRegex, "Этот номер является некорректным.")
        .required("Это поле является обязательным для заполнения."),

    password: yup
        .string()
        .min(6, "Этот пароль слишком короткий.")
        .max(20, "Этот пароль слишким длинный.")
        .required("Это поле является обязательным для заполнения."),

    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать.')
        .required("Это поле является обязательным для заполнения.")
});


class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.props.dispatch(userActions.logout());

        this.state = {
            phonenumber: "",
            password: "",
            showPassword: false,

            loading: false,
            submitted: false
        };
    }

    handleClickShowPassword(e) {
        if (this.state.showPassword === true) {
            this.setState({
                showPassword: false
            });
        } else {
            this.setState({
                showPassword: true
            });
        }
    };

    render() {
        const { message } = this.props;
        const { promouter_id, teather_id } = this.props.match.params;
        return (
            <Grid container>
                <Grid xs={12} sm={6} className='center'>
                    <Formik
                        initialValues={{
                            firstname: "",
                            lastname: "",
                            phonenumber: "",
                            password: "",
                            passwordConfirmation: "",
                            country: "",
                            sity: ""
                        }}
                        validationSchema={SignupSchema}

                        onSubmit={(values) => {
                            const { firstname, lastname, phonenumber, country, sity, password } = values;
                            this.setState({ submitted: true });
                            const { dispatch } = this.props;
                            if (phonenumber && password) {
                                dispatch(userActions.signup(firstname, lastname, phonenumber, country, sity, password, teather_id, promouter_id));
                            }
                        }
                        }
                    >
                        {({ errors, values, handleChange, touched }) => (
                            <Form className='form'>

                                <div className='title'>
                                    <Typography component="h1" variant="h5">Регистрация</Typography>
                                </div>

                                {message && (
                                    <Alert severity="error">{message}</Alert>
                                )}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextInput
                                            error={errors.firstname && touched.firstname}
                                            autoComplete="fname"
                                            name="firstname"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="firstname"
                                            label="Имя*"
                                            autoFocus
                                            variant={'outlined'}
                                            helperText={
                                                errors.firstname && touched.firstname
                                                    ? errors.firstname
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextInput
                                            error={errors.lastname && touched.lastname}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="lastname"
                                            label="Фамилия"
                                            name="lastname"
                                            autoComplete="lastname"
                                            variant={'outlined'}
                                            helperText={
                                                errors.lastname && touched.lastname
                                                    ? errors.lastname
                                                    : null
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextInput
                                            autoComplete="fname"
                                            name="country"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="country"
                                            label="Страна"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextInput

                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="sity"
                                            label="Город"
                                            name="sity"
                                            autoComplete="lname"

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.phonenumber && touched.phonenumber}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="phonenumper"
                                            label="Номер телефона*"
                                            name="phonenumber"
                                            autoComplete="phonenumber"
                                            InputProps={{
                                                startAdornment: '+7',
                                            }}
                                            helperText={
                                                errors.phonenumber && touched.phonenumber ? errors.phonenumber : null
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.password && touched.password}
                                            value={values.password}
                                            fullWidth
                                            id="password"
                                            variant="outlined"
                                            type={this.state.showPassword === true ? 'text' : 'password'}
                                            label="Пароль*"
                                            onChange={handleChange}
                                            autoComplete="password"
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : null
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.passwordConfirmation && touched.passwordConfirmation}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            name="passwordConfirmation"
                                            label="Подтвердите пароль*"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            id="passwordConfirmation"
                                            autoComplete="password"
                                            helperText={
                                                errors.passwordConfirmation && touched.passwordConfirmation
                                                    ? errors.passwordConfirmation
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    className='my-3'
                                >
                                    Регистрация
                    </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to="/sign-in" variant="body2">
                                            Уже есть аккаут? Войти
                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>

                <Grid xs={12} sm={6}>
                    <img src={`${config.url}/assets/img/signup.png`} width='100%' alt="sign-up" />
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.alert;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        message
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 