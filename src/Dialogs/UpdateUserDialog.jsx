import React, { useEffect } from 'react';
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
    Loading,
    Alert
} from '../_components';

import { userActions } from "../_actions";

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

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
    email: yup.string().email("Недопустимый формат для Email.")
});

const UpdateUserDialog = ({ open, close, jwt, user, dispatch, promouters, teathers, coordinators, admins, selected_user, update_user_loading, update_user_message, update_user_error, update_self_loading, update_self_message, update_self_error, user_roles_loading, user_roles_error, user_roles }) => {
    useEffect(() => {
        const init = async () => { await dispatch(userActions.getUserRoles(jwt)) }
        if (open) init()
    }, [open]);

    const onCloseDialog = () => {
        dispatch(userActions.cleanSelectedUser())
        close()
    }

    return (
        <Dialog onClose={onCloseDialog} open={open}>
            {selected_user ?
                <Formik
                    initialValues={{
                        firstname: selected_user.firstname ? selected_user.firstname : '',
                        lastname: selected_user.lastname ? selected_user.lastname : '',
                        phonenumber: selected_user.phonenumber ? selected_user.phonenumber : '',
                        email: selected_user.email ? selected_user.email : '',
                        country: selected_user.country ? selected_user.country : '',
                        sity: selected_user.sity ? selected_user.sity : '',
                        commune: selected_user.commune ? selected_user.commune : '',
                        access: selected_user.access ? selected_user.access : 'limited',
                        offline_user: selected_user.offline_user ? selected_user.offline_user : "0",
                        user_role_id: selected_user.user_role_id ? selected_user.user_role_id : 7,
                        promouter_id: selected_user.promouter && selected_user.promouter.id ? selected_user.promouter.id : 0,
                        teather_id: selected_user.teather && selected_user.teather.id ? selected_user.teather.id : 0,
                        coordinator_id: selected_user.coordinator && selected_user.coordinator.id ? selected_user.coordinator.id : 0,
                        admin_id: selected_user.admin && selected_user.admin.id ? selected_user.admin.id : 0,
                    }}
                    validationSchema={UpdateUserSchema}

                    onSubmit={(values) => {
                        const { firstname, lastname, phonenumber, email, country, sity, commune, access, offline_user, user_role_id, promouter_id, teather_id, coordinator_id, admin_id } = values;
                        if (user.id === selected_user.id) dispatch(userActions.updateSelf(jwt, { ...selected_user, firstname, lastname, phonenumber, email, country, sity, commune })).then(() => onCloseDialog())
                        else dispatch(userActions.updateUser(jwt, { ...selected_user, firstname, lastname, phonenumber, email, country, sity, commune, access, offline_user, user_role_id, promouter_id, teather_id, coordinator_id, admin_id })).then(() => onCloseDialog())
                    }}
                >
                    {({ errors, values, handleChange, setFieldValue, touched }) => (
                        <Form className='form w-100'>
                            <DialogTitle>
                                <Typography variant='h5' component='h5'>{'Изменить личную информацию'}</Typography>
                            </DialogTitle>
                            <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
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
                                            error={errors.lastname && touched.lastname}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="lastname"
                                            label="Фамилия"
                                            name="lastname"
                                            autoComplete="lastname"
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
                                            error={errors.phonenumber && touched.phonenumber}
                                            variant="outlined"
                                            fullWidth
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
                                    {user.id !== selected_user.id &&
                                        <React.Fragment>
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
                                                        {user_roles.map((role, index) => {
                                                            return <SelectItem key={index} value={role.role_id}>{role.role_name}</SelectItem>
                                                        })}
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
                                                        {teathers.map((user, index) => (
                                                            <SelectItem key={index} value={user.id}>{user.firstname + ' ' + user.lastname}</SelectItem>
                                                        ))}
                                                    </TextInput>
                                                }
                                            </Grid>
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
                            <DialogActions>
                                {user.id === selected_user.id ?
                                    <Button type="submit" className={'mr-3'} variant='outlined' color="primary" loading={update_self_loading} disabled={update_self_loading}>Сохранить</Button>
                                    :
                                    <Button type="submit" className={'mr-3'} variant='outlined' color="primary" loading={update_user_loading} disabled={update_user_loading}>Сохранить</Button>
                                }
                                <Button onPress={onCloseDialog} variant='outlined' color="primary">Отмена</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
                : null}
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt, user, update_self_loading, update_self_message, update_self_error } = state.authentication;
    const { promouters, teathers, coordinators, admins, selected_user, user_roles_loading, user_roles_error, user_roles, update_user_loading, update_user_message, update_user_error } = state.users;
    return { jwt, user, promouters, teathers, coordinators, admins, selected_user, update_user_loading, update_user_message, update_user_error, user_roles_loading, user_roles_error, user_roles, update_self_loading, update_self_message, update_self_error };
}

const connectedUpdateUserDialog = connect(mapStateToProps)(UpdateUserDialog);
export { connectedUpdateUserDialog as UpdateUserDialog };