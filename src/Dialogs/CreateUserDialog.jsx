import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    TextInput,
    FormControlLabel,
    Radio,
    SelectItem,
    IconButton,
    Loading,
    Alert
} from '../_components';

import { userActions } from "../_actions";

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

let UpdateUserSchema = yup.object().shape({
    firstname: yup.string().required("Это поле является обязательным для заполнения."),
    phonenumber: yup
        .string()
        .min(10, "Этот номер слишком короткий.")
        .max(10, "Этот номер слишким длинный.")
        .matches(phoneRegex, "Этот номер является некорректным.")
        .required("Это поле является обязательным для заполнения."),
    email: yup.string().email("Недопустимый формат для Email.").nullable(),
    password: yup
        .string()
        .min(6, "Этот пароль слишком короткий.")
        .max(20, "Этот пароль слишким длинный.")
        .required("Это поле является обязательным для заполнения."),
});

const CreateUserDialog = ({ open, close, jwt, user, dispatch, users, promouters, teathers, coordinators, admins, create_user_loading, create_user_message, create_user_error, user_roles_loading, user_roles_error, user_roles }) => {
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        const init = async () => {
            await dispatch(userActions.getUserRoles(jwt))
        }
        if (open) init()
    }, [open]);

    return (
        <Dialog onClose={() => close()} open={open}>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    phonenumber: '',
                    email: '',
                    password: '',
                    country: '',
                    sity: '',
                    commune: '',
                    access: 'limited',
                    offline_user: "1",
                    user_role_id: 7,
                    promouter_id: 0,
                    teather_id: user.role_type === 'ROLE_TEATHER' ? user.id : 0,
                    coordinator_id: 0,
                    admin_id: 0,
                }}
                validationSchema={UpdateUserSchema}

                onSubmit={async (values, { resetForm }) => {
                    const { firstname, lastname, phonenumber, email, password, country, sity, commune, access, offline_user, user_role_id, promouter_id, teather_id, coordinator_id, admin_id } = values;
                    await dispatch(userActions.createUser(jwt, close, resetForm, { firstname, lastname, phonenumber, email, password, country, sity, commune, access, offline_user, user_role_id, promouter_id, teather_id, coordinator_id, admin_id }))
                }}
            >
                {({ errors, values, handleChange, setFieldValue, touched }) => (
                    <Form className='form w-100 m-0'>
                        <DialogTitle className={'border-bottom'}>
                            <Typography className={'m-0'} variant='h5' component='h5'>{'Создать пользователя'}</Typography>
                        </DialogTitle>
                        <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextInput
                                        autoFocus
                                        fullWidth
                                        error={errors.firstname && touched.firstname}
                                        autoComplete="firstname"
                                        id="firstname"
                                        name="firstname"
                                        label="Имя*"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.firstname}
                                        helperText={
                                            errors.firstname && touched.firstname
                                                ? errors.firstname
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextInput
                                        fullWidth
                                        error={errors.lastname && touched.lastname}
                                        autoComplete="lastname"
                                        id="lastname"
                                        name="lastname"
                                        label="Фамилия"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.lastname}
                                        helperText={
                                            errors.lastname && touched.lastname
                                                ? errors.lastname
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextInput
                                        fullWidth
                                        error={errors.phonenumber && touched.phonenumber}
                                        variant="outlined"
                                        onChange={handleChange}
                                        id="phonenumper"
                                        label="Номер телефона*"
                                        name="phonenumber"
                                        autoComplete="phonenumber"
                                        value={values.phonenumber}
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
                                        error={errors.email && touched.email}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={values.email}
                                        helperText={
                                            errors.email && touched.email ? errors.email : null
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
                                        type={showPassword === true ? 'text' : 'password'}
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
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextInput
                                        autoComplete="country"
                                        name="country"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="country"
                                        label="Страна"
                                        value={values.country}
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
                                        autoComplete="sity"
                                        value={values.sity}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextInput
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="commune"
                                        label="Община"
                                        name="commune"
                                        autoComplete="commune"
                                        value={values.commune}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    {user_roles_loading && <React.Fragment>
                                        <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить роль пользователя`}</Typography>
                                        <Loading className="h-100" />
                                    </React.Fragment>
                                    }
                                    {user_roles_error && <React.Fragment>
                                        <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить роль пользователя`}</Typography>
                                        <Alert className='info' severity="info">{user_roles_error}</Alert>
                                    </React.Fragment>}
                                    {user_roles &&
                                        <TextInput
                                            select
                                            id="user_role_id"
                                            name="user_role_id"
                                            label="Роль пользователя"
                                            autoComplete="user_role_id"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            defaultValue={values.user_role_id}
                                            className='w-100'
                                        >
                                            <SelectItem disabled >Выберите роль пользователя...</SelectItem>
                                            {user.role_type === 'ROLE_TEATHER' ?
                                                user_roles.map((role, index) => {
                                                    return role.role_name === 'Ученик' && <SelectItem key={index} value={role.role_id}>{role.role_name}</SelectItem>
                                                })
                                                :
                                                user_roles.map((role, index) => {
                                                    return <SelectItem key={index} value={role.role_id}>{role.role_name}</SelectItem>
                                                })
                                            }
                                        </TextInput>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography component={'body'} variant={'body'} className='m-0'>{`Оффлайн ученик:`}</Typography>
                                    <FormControlLabel
                                        id="offline_user_0"
                                        className='w-max'
                                        control={
                                            <Radio
                                                id="offline_user_0"
                                                name={'offline_user'}
                                                value={"0"}
                                                selected={values.offline_user === "0"}
                                                onChange={() => setFieldValue("offline_user", "0")}
                                            />
                                        }
                                        label={'Нет'}
                                    />
                                    <FormControlLabel
                                        id="offline_user_1"
                                        className='w-max'
                                        control={
                                            <Radio
                                                id="offline_user_1"
                                                name={'offline_user'}
                                                value={"1"}
                                                selected={values.offline_user === "1"}
                                                onChange={() => setFieldValue("offline_user", "1")}
                                            />
                                        }
                                        label={'Да'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography component={'body'} variant={'body'} className='m-0'>{`Доступ к курсам:`}</Typography>
                                    <FormControlLabel
                                        id="access_limited"
                                        className='w-max'
                                        control={
                                            <Radio
                                                id="access_limited"
                                                name={'access'}
                                                value={'limited'}
                                                selected={values.access === "limited"}
                                                onChange={() => setFieldValue("access", "limited")}
                                            />
                                        }
                                        label={'Ограниченый'}
                                    />
                                    <FormControlLabel
                                        id="access_full"
                                        className='w-max'
                                        control={
                                            <Radio
                                                id="access_full"
                                                name={'access'}
                                                value={'full'}
                                                selected={values.access === "full"}
                                                onChange={() => setFieldValue("access", "full")}
                                            />
                                        }
                                        label={'Полный'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    {promouters &&
                                        <TextInput
                                            select
                                            id="promouter_id"
                                            name="promouter_id"
                                            label="Промоутер пользователя"
                                            autoComplete="promouter_id"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            defaultValue={values.promouter_id}
                                            className='w-100'
                                        >
                                            <SelectItem disabled value={0}>Выберите промоутер пользователя...</SelectItem>
                                            {promouters.map((user, index) => (
                                                <SelectItem key={index} value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                            ))}
                                        </TextInput>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    {teathers &&
                                        <TextInput
                                            select
                                            id="teather_id"
                                            name="teather_id"
                                            label="Учитель пользователя"
                                            autoComplete="teather_id"
                                            variant={'outlined'}
                                            onChange={handleChange}
                                            defaultValue={values.teather_id}
                                            className='w-100'
                                        >
                                            <SelectItem disabled value={0}>Выберите учителя пользователя...</SelectItem>
                                            {user.role_type === 'ROLE_TEATHER' ?
                                                <SelectItem value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                                :
                                                teathers.map((user, index) => (
                                                    <SelectItem key={index} value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                                ))}
                                        </TextInput>
                                    }
                                </Grid>
                                {user.role_type !== 'ROLE_TEATHER' &&
                                    <React.Fragment>
                                        <Grid item xs={12} sm={12}>
                                            {coordinators &&
                                                <TextInput
                                                    select
                                                    id="coordinator_id"
                                                    name="coordinator_id"
                                                    label="Координатор пользователя"
                                                    autoComplete="coordinator_id"
                                                    variant={'outlined'}
                                                    onChange={handleChange}
                                                    defaultValue={values.coordinator_id}
                                                    className='w-100'
                                                >
                                                    <SelectItem disabled value={0}>Выберите координатора пользователя...</SelectItem>
                                                    {coordinators.map((user, index) => (
                                                        <SelectItem key={index} value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                                    ))}
                                                </TextInput>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            {admins &&
                                                <TextInput
                                                    select
                                                    id="admin_id"
                                                    name="admin_id"
                                                    label="Администратор пользователя"
                                                    autoComplete="admin_id"
                                                    variant={'outlined'}
                                                    onChange={handleChange}
                                                    defaultValue={values.admin_id}
                                                    className='w-100'
                                                >
                                                    <SelectItem disabled value={0}>Выберите администратора пользователя...</SelectItem>
                                                    {admins.map((user, index) => (
                                                        <SelectItem key={index} value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                                    ))}
                                                </TextInput>
                                            }
                                        </Grid>
                                    </React.Fragment>
                                }
                            </Grid>

                        </DialogContent>
                        <DialogActions className={'border-top'}>
                            {create_user_error && <Alert className='error' severity="error">{create_user_error}</Alert>}
                            <Button type="submit" variant='outlined' color="primary" loading={create_user_loading} disabled={create_user_loading}>Создать</Button>
                            <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { users, promouters, teathers, coordinators, admins, create_user_loading, create_user_message, create_user_error, user_roles_loading, user_roles_error, user_roles } = state.users;
    return { users, promouters, teathers, coordinators, admins, jwt, user, create_user_loading, create_user_message, create_user_error, user_roles_loading, user_roles_error, user_roles };
}

const connectedCreateUserDialog = connect(mapStateToProps)(CreateUserDialog);
export { connectedCreateUserDialog as CreateUserDialog };