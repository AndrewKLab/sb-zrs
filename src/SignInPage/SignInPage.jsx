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
    Avatar,
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";
  import Alert from '@material-ui/lab/Alert';
  
  import Visibility from '@material-ui/icons/Visibility';
  import VisibilityOff from '@material-ui/icons/VisibilityOff';
  import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
  
  import { Formik, Form } from "formik";
  import * as yup from "yup";
  import "yup-phone";

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
      
            loading: false,
            submitted: false
        };
    }

    handleClickShowPassword(e) {
        if(this.state.showPassword === true){
          this.setState({
            showPassword: false
          });
        }else{
          this.setState({
            showPassword: true
          });
        }
    };

    render() {
        const { loggingIn, classes, message } = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <img src={"http://lifestudio-test.ru/assets/img/signin.png"} className={classes.img} alt="sign-in" />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>

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
                            {({ errors, handleChange, touched }) => (
                                <Form className={classes.form}>
                                    <Typography component="h1" variant="h5" className={classes.title}>
                                        <Avatar className={classes.loginIcon}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        Вход
                                    </Typography>
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {message && (
                                                <Alert className={classes.error} severity="error">{message}</Alert>
                                            )}
                                            <TextField
                                                error={errors.phonenumber && touched.phonenumber}
                                                variant="outlined"
                                                fullWidth
                                                onChange={handleChange}
                                                id="phonenumper"
                                                label="Номер телефона"
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
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                label="Пароль"
                                                onChange={handleChange('password')}
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

                                    </Grid>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Запомнить меня"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Вход
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Забыли пароль?
                                        </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="/sign-up" variant="body2">
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