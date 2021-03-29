import React from 'react';
import { connect } from 'react-redux';
import {
    Accordion,
    Avatar,
    Divider,
    IconButton,
    UserPlane,
    Typography,
    UserCourseProgress
} from '../';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const UserAccordionPlane = ({ edit, remove, user, close, userData }) => {
    return (
        <Accordion classBody={'mb-3'} labеl={
            <UserPlane className='p-0' name={user.firstname + " " + user.lastname} avatar={user.avatar} status={user.status} />
        }>
            <div>
                <div className={'d-flex p-3 grid-direction-xs-column w-100'}>
                    <div className={'d-flex grid-align-items-xs-center grid-justify-xs-center w-100'}>
                        <Avatar alt={user.firstname + " " + user.lastname} src={user.avatar} className={'avatar-large'} />
                    </div>
                    <div className={'d-flex grid-justify-xs-space-between grid-align-items-xs-center'}>
                        <Typography component='h5' variant='h5'>{user.firstname + " " + user.lastname}</Typography>
                        <div className={'d-flex'}>
                            <IconButton onClick={() => edit(user)}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => remove(user)}>
                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                            </IconButton>
                        </div>
                    </div>
                    <div className={'d-flex'}>
                        <div>
                            <strong>Телефон: </strong>+7{user.phonenumber}<br />
                            <strong>Страна: </strong>{user.country}<br />
                            <strong>Город: </strong>{user.sity}<br />
                            <strong>Статус: </strong>{user.status}<br />
                            <strong>Доступ к курсам: </strong>{user.access === 'full' ? 'полный' : 'ограниченый'}<br />
                            <strong>Учитель: </strong>{user.teather === null ? 'НЕТ' : user.teather.name}
                        </div>
                    </div>
                    <Divider className={'my-3'} />
                        <Typography component='h6' variant='h6' className={'m-0'}>Прогресс:</Typography>
                    <Divider className={'my-3'} />
                    {user.courses_passed !== null ? (
                        <UserCourseProgress courses={user.courses_passed}/>
                        ):'Этот пользователь еще не начал проходить курсы.'}
                </div>
            </div>
        </Accordion>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUserAccordionPlane = connect(mapStateToProps)(UserAccordionPlane);
export { connectedUserAccordionPlane as UserAccordionPlane };