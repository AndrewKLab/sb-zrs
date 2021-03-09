import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Form,
    FormControlLabel,
    Radio
} from '../_components';

import { userActions } from "../_actions";

const UpdateUserStatusDialog  = ({ open, close, jwt, dispatch, user }) => {
    const [status, setStauts] = useState(user.status);

    const changeStauts = (event) => { setStauts(event) }
    const submit = (event) => {
        event.preventDefault();
        dispatch(userActions.updateUser(user.id, jwt, user.firstname, user.lastname, user.phonenumber, user.country, user.sity, status, user.access, user.roles, user.avatar, user.admin_id, user.teather_id, user.promouter_id)).then(close())
    }

    return (
        <Dialog onClose={() => close()} open={open}>
            <Form onSubmit={(event) => submit(event)}>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>Изменить статус ученика: {user.firstname + ' ' + user.lastname}</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'ИСКАТЕЛЬ'}
                                selected={status === "ИСКАТЕЛЬ" ? "ИСКАТЕЛЬ" : ""}
                                onChange={changeStauts}
                            />
                        }
                        label={'ИСКАТЕЛЬ'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'УЧЕНИК'}
                                selected={status === "УЧЕНИК" ? "УЧЕНИК" : ""}
                                onChange={changeStauts}
                            />
                        }
                        label={'УЧЕНИК'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'ПРОМОУТЕР'}
                                selected={status === "ПРОМОУТЕР" ? "ПРОМОУТЕР" : ""}
                                onChange={changeStauts}
                            />
                        }
                        label={'ПРОМОУТЕР'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" className={'mr-3'} variant='outlined' color="primary">Подтвердить</Button>
                    <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                </DialogActions>
            </Form>
        </Dialog>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUpdateUserStatusDialog = connect(mapStateToProps)(UpdateUserStatusDialog);
export { connectedUpdateUserStatusDialog as UpdateUserStatusDialog };