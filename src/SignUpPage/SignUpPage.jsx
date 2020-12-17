import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {
    InputAdornment,
    TextField,
    Typography,
    Grid,
    Button,
    IconButton,
    Link,
    Paper
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

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
    lastname: yup.string().required("Это поле является обязательным для заполнения."),

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
        const { classes, message } = this.props;
        return (
            <Grid container>
                <Grid xs={12} sm={6} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
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
                                dispatch(userActions.signup(firstname, lastname, phonenumber, country, sity, password));
                            }
                        }
                        }
                    >
                        {({ errors, handleChange, touched }) => (
                            <Form className={classes.form}>
                                <Typography component="h1" variant="h5" className={classes.title}>
                                    Регистрация
                                </Typography>
                                {message && (
                                    <Alert className={classes.error} severity="error">{message}</Alert>
                                )}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={errors.firstname && touched.firstname}
                                            autoComplete="fname"
                                            name="firstname"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="firstname"
                                            label="Имя*"
                                            autoFocus
                                            helperText={
                                                errors.firstname && touched.firstname
                                                    ? errors.firstname
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={errors.lastname && touched.lastname}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="lastname"
                                            label="Фамилия*"
                                            name="lastname"
                                            autoComplete="lname"
                                            helperText={
                                                errors.lastname && touched.lastname
                                                    ? errors.lastname
                                                    : null
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
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
                                        <TextField

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
                                        <TextField
                                            error={errors.phonenumber && touched.phonenumber}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="phonenumper"
                                            label="Номер телефона*"
                                            name="phonenumber"
                                            autoComplete="phonenumber"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+7</InputAdornment>,
                                            }}
                                            helperText={
                                                errors.phonenumber && touched.phonenumber ? errors.phonenumber : null
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.password && touched.password}
                                            fullWidth
                                            id="password"
                                            variant="outlined"
                                            type={this.state.showPassword === true ? 'text' : 'password'}
                                            label="Пароль*"
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : null
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.passwordConfirmation && touched.passwordConfirmation}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            name="passwordConfirmation"
                                            label="Подтвердите пароль*"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            id="passwordConfirmation"
                                            autoComplete="current-password"
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
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Регистрация
                    </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href="/sign-in" variant="body2">
                                            Уже есть аккаут? Войти
                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>

                <Grid xs={12} sm={6}>
                    <img src={"http://lifestudio-test.ru/assets/img/signup.png"} className={classes.img} alt="sign-up" />
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.alert;
    const { loggingIn } = state.authentication;
    const { theme, classes } = state.style;
    return {
        loggingIn,
        theme,
        classes,
        message
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 