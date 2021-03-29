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
} from '../_components'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";
import config from 'config';

const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

let SignupSchema = yup.object().shape({
    phonenumber: yup
        .string()
        .min(10, "Этот номер слишком короткий.")
        .max(10, "Этот номер слишким длинный.")
        .matches(phoneRegex, "Этот номер является некорректным.")
        .required("Это поле является обязательным для заполнения."),

    password: yup
        .string()
        .required("Это поле является обязательным для заполнения."),
});


class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.props.dispatch(userActions.logout());

        this.state = {
            phonenumber: "",
            password: "",
            showPassword: false,

            remember: false,

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

    remember() {
        const { remember } = this.state;
        this.setState({ remember: !remember })
    }

    render() {
        const { message } = this.props;
        const { remember } = this.state
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <img src={`${config.url}/assets/img/signin.png`} className='img' alt="sign-in" />
                    </Grid>

                    <Grid item xs={12} sm={6} className='center'>

                        <Formik
                            initialValues={{
                                phonenumber: "",
                                password: "",
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                const { phonenumber, password } = values;
                                this.setState({ submitted: true });
                                const { dispatch } = this.props;
                                if (phonenumber && password) {
                                    dispatch(userActions.signin(phonenumber, password));
                                }
                            }
                            }
                        >
                            {({ errors, values, handleChange, setFieldValue, touched }) => (
                                <Form className='form'>

                                    <div className='title'>
                                        <Avatar className='loginIcon'><LockOutlinedIcon /></Avatar>
                                        <Typography component="h1" variant="h5">Вход</Typography>
                                    </div>

                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                            {message && (
                                                <Alert className='error' severity="error">{message}</Alert>
                                            )}

                                            <TextInput
                                                error={errors.phonenumber && touched.phonenumber}
                                                value={values.phonenumper}
                                                id="phonenumper"
                                                name="phonenumber"
                                                label="Номер телефона"
                                                type={'tel'}
                                                autoComplete="phonenumber"
                                                variant={'outlined'}
                                                onChange={handleChange}
                                                onSelect={val => setFieldValue("value", val)}
                                                helperText={
                                                    errors.phonenumber && touched.phonenumber ? errors.phonenumber : null
                                                }
                                                InputProps={{
                                                    startAdornment: '+7',
                                                }}
                                                className='w-100'
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextInput
                                                error={errors.password && touched.password}
                                                value={values.password}
                                                id="password"
                                                label="Пароль"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                variant={'outlined'}
                                                onChange={handleChange}
                                                onSelect={val => setFieldValue("value", val)}
                                                helperText={
                                                    errors.password && touched.password
                                                        ? errors.password
                                                        : null
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            ariaLabel="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                className='w-100'
                                            />
                                        </Grid>

                                    </Grid>

                                    <FormControlLabel
                                        control={<Checkbox checked={remember} name='remember' onChange={() => this.remember()} />}
                                        label="Запоминить меня"
                                    />


                                    <Button fullWidth type="submit" className='my-3'>
                                        Вход
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="#" >
                                                Забыли пароль?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/sign-up" >
                                                {"Регистрация"}
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </div>
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

const connectedSignInPage = connect(mapStateToProps)(SignInPage);
export { connectedSignInPage as SignInPage }; 