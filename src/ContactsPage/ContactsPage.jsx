import React from 'react';

import {
    Avatar,
    Button,
    Alert,
    Checkbox,
    FormControlLabel,
    Typography,
    TextInput,
    IconButton,
    Grid,
} from '../_components'

import { connect } from 'react-redux';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Formik, Form } from "formik";
import * as yup from "yup";
import config from 'config';

let SignupSchema = yup.object().shape({
    name: yup
        .string()
        .required("Это поле является обязательным для заполнения."),
    email: yup
        .string()
        .email("Этот email является некорректным."),
    theme: yup
        .string()
        .max(20, "Это название слишком длинное.")
        .required("Это поле является обязательным для заполнения."),
    message: yup
        .string()
        .required("Это поле является обязательным для заполнения."),
});

const ContactsPage = ({ message }) => {

    return (
        <div className="pb-3">
            <div className="flex-container-2 gap-8 ">
                <div className="flex-item-2 mt-3">
                    <Typography variant="h3" component="h1" className={"text-align-center"} >Наши контакты:</Typography>
                    <div className="title-underline-container mb-3">
                        <div className="title-underline"></div>
                    </div>
                    <div>
                        <p className="m-0"><strong>Адрес: </strong>г. Тула, ул. Станиславского, д. 48</p>
                        <p className="m-0"><strong>Горячая линия: </strong><a href="tel:8(800)1001844" className="text-link">8 (800) 100 18 44</a></p>
                        <p className="m-0"><strong>E-mail: </strong> <a href="mailto:contact@kniga-knig.info" className="text-link">contact@kniga-knig.info</a></p>
                    </div>
                    <div className="adress-map mt-3">
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A24e9288036fb152d361a7d5012fa56fc430a5cff1c2cf9ff7a9bbc09612a8fa2&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
                    </div>
                </div>
                <div className="flex-item-2 mt-3">
                    <Typography variant="h3" component="h1" className={"text-align-center"} >Обратная связь:</Typography>
                    <div className="title-underline-container mb-3">
                        <div className="title-underline"></div>
                    </div>
                    {/* <p className="m-0">Отправить сообщение. Все поля, отмеченные звездочкой, являются обязательными.</p> */}

                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            theme: "",
                            message: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            // const { phonenumber, password } = values;
                            // this.setState({ submitted: true });
                            // const { dispatch } = this.props;
                            // if (phonenumber && password) {
                            //     dispatch(userActions.signin(phonenumber, password));
                            // }
                        }
                        }
                    >
                        {({ errors, values, handleChange, setFieldValue, touched }) => (
                            <Form className='form w-100'>
                                <Grid container spacing={3}>

                                    <Grid item xs={12}>
                                        {message && (
                                            <Alert className='error' severity="error">{message}</Alert>
                                        )}

                                        <TextInput
                                            error={errors.name && touched.name}
                                            value={values.name}
                                            id="name"
                                            name="name"
                                            label="Имя*"
                                            type={'text'}
                                            autoComplete="name"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            onSelect={val => setFieldValue("value", val)}
                                            helperText={
                                                errors.name && touched.name ? errors.name : null
                                            }
                                            className='w-100'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.email && touched.email}
                                            value={values.email}
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type={'email'}
                                            autoComplete="email"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            onSelect={val => setFieldValue("value", val)}
                                            helperText={
                                                errors.email && touched.email ? errors.email : null
                                            }
                                            className='w-100'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.theme && touched.theme}
                                            value={values.theme}
                                            id="theme"
                                            name="theme"
                                            label="Тема*"
                                            type={'text'}
                                            autoComplete="theme"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            onSelect={val => setFieldValue("value", val)}
                                            helperText={
                                                errors.theme && touched.theme ? errors.theme : null
                                            }
                                            className='w-100'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextInput
                                            error={errors.message && touched.message}
                                            value={values.message}
                                            multiline
                                            rows={4}
                                            id="message"
                                            name="message"
                                            label="Сообщение*"
                                            type={'message'}
                                            autoComplete="message"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            onSelect={val => setFieldValue("value", val)}
                                            helperText={
                                                errors.message && touched.message ? errors.message : null
                                            }
                                            className='w-100'
                                        />
                                    </Grid>

                                </Grid>
                                <Button fullWidth type="submit" className='my-3'>Отправить сообщение</Button>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    return { jwt, user };
}
const connectedContactsPage = connect(mapStateToProps)(ContactsPage);
export { connectedContactsPage as ContactsPage };
