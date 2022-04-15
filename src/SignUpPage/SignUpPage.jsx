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
            privacy: false,
            showPassword: false,
            signup_error_text: '',

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

    privacy() {
        const { privacy } = this.state;
        this.setState({ privacy: !privacy })
    }

    render() {
        const { signup_error } = this.props;
        const { privacy, signup_error_text } = this.state;
        const { promouter_id, teather_id } = this.props.match.params;
        return (
            <Grid container>
                <Grid xs={12} sm={12} md={12} lg={6} className='center'>
                    <Formik
                        initialValues={{
                            firstname: "",
                            lastname: "",
                            phonenumber: "",
                            password: "",
                            passwordConfirmation: "",
                            country: "",
                            sity: "",
                        }}
                        validationSchema={SignupSchema}

                        onSubmit={(values) => {
                            const { firstname, lastname, phonenumber, country, sity, password } = values;
                            const { privacy } = this.state;
                            const { dispatch } = this.props;
                            this.setState({ signup_error_text: '' });

                            if (privacy) {
                                this.setState({ submitted: true });

                                if (phonenumber && password) {
                                    dispatch(userActions.signup(firstname, lastname, phonenumber, country, sity, password, teather_id, promouter_id));
                                }
                            } else {
                                this.setState({ signup_error_text: 'Пожалуйста дайте согласие на обработку персональных данных!' });
                            }

                        }
                        }
                    >
                        {({ errors, values, handleChange, touched }) => (
                            <Form className='form pb-3'>

                                <div className='title'>
                                    <Typography component="h2" variant="h2">Регистрация</Typography>
                                </div>

                                {signup_error && (
                                    <Alert className='error mb-3' severity="error">{signup_error}</Alert>
                                )}
                                {signup_error_text && (
                                    <Alert className='error mb-3' severity="error">{signup_error_text}</Alert>
                                )}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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

                                    <Grid item xs={12} sm={12}>
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

                                    <Grid item xs={12} sm={12}>
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

                                    <Grid item xs={12} sm={12}>
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
                                <FormControlLabel
                                    control={<Checkbox checked={privacy} name='privacy' onChange={() => this.privacy()} />}
                                    label={<a href='/privacy' target="_blank">Согласие на обработку персональных данных</a>}
                                />
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

                <Grid className={'p-relative'} xs={12} sm={12} md={12} lg={6}>
                    <img src={`${config.url}/assets/img/signup.webp`} width='100%' height={"100%"} style={{ minHeight: '600px' }} alt="sign-up" />
                    <div className='signup-img-text'>
                        <Typography className={'text-align-center'} variant={'h1'} component={'h1'}>Для чего нужна регистрация?</Typography>
                        <Typography variant={'body'} component={'body'}>Регистрация дает возможность завести для Вас на сайте личный кабинет, где хранятся Ваши достижения, "свитки" и пр.</Typography>
                        <Typography variant={'body'} component={'body'}>Мы бережно храним Ваши персональные данные и не передаем их третьим лицам.</Typography>
                        <Typography variant={'body'} component={'body'}>Также мы не используем их для навязчивой рассылки различной рекламы.</Typography>
                        <Typography variant={'body'} component={'body'}>Регистрация используется только в Ваших интересах!</Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { isLogined, signup_loading, signup_error } = state.authentication;
    return {
        isLogined,
        signup_loading,
        signup_error
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 