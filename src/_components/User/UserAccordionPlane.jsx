import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    Accordion,
    Avatar,
    Divider,
    IconButton,
    UserPlane,
    Typography,
    UserCourseProgress,
    Grid
} from '../';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const UserAccordionPlane = ({ className, edit, remove, user, users, progress, usersBlock }) => {
    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            {user &&
                <Accordion open={open} setOpen={setOpen} className={className} labеl={
                    <UserPlane className='p-0' name={user.firstname + " " + user.lastname} avatar={user.avatar} status={user.status} />
                }>
                    <div className={'d-flex p-3 grid-direction-xs-column w-100 border-top'}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <div className={'d-flex grid-align-items-xs-center grid-justify-xs-center w-100'}>
                                    <Avatar alt={user.firstname + " " + user.lastname} src={user.avatar} className={'avatar-large'} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <div className={'d-flex grid-justify-xs-space-between grid-align-items-xs-center'}>
                                    <Typography component='h5' variant='h5'>{user.firstname + " " + user.lastname}</Typography>
                                    <div className={'d-flex'}>
                                        <IconButton onClick={() => edit(user)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { remove(user), setOpen(false) }}>
                                            <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                        </IconButton>
                                    </div>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Доступ к курсам: </strong>{user.access === 'full' ? <span className='text-success'>Полный</span> : <span className='text-danger'>Ограниченый</span>}<br />
                                        <strong>Оффлайн ученик: </strong>{user.offline_user === '1' ? <span className='text-success'>Да</span> : <span className='text-danger'>Нет</span>}<br />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Роль: </strong>{user.role_name}<br />
                                        <strong>Дата регистрации: </strong>{moment(user.created).format('DD/MM/YYYY')}<br />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Телефон: </strong>{user.phonenumber ? <a href={`tel:+7${user.phonenumber}`}>+7{user.phonenumber}</a> : ''}<br />
                                        <strong>Email: </strong>{user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : ''}<br />
                                        <strong>Страна: </strong>{user.country}<br />
                                        <strong>Город: </strong>{user.sity}<br />
                                        <strong>Община: </strong>{user.commune}<br />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Промоутер: </strong>{!user.promouter ? <span className='text-danger'>НЕТ</span> : `${user.promouter.firstname} ${user.promouter.lastname}`}<br />
                                        <strong>Учитель: </strong>{!user.teather ? <span className='text-danger'>НЕТ</span> : `${user.teather.firstname} ${user.teather.lastname}`}<br />
                                        <strong>Координатор: </strong>{!user.coordinator ? <span className='text-danger'>НЕТ</span> : `${user.coordinator.firstname} ${user.coordinator.lastname}`}<br />
                                        <strong>Администратор: </strong>{!user.admin ? <span className='text-danger'>НЕТ</span> : `${user.admin.firstname} ${user.admin.lastname}`}<br />
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Grid>
                        {progress &&
                            <React.Fragment>
                                <Divider className={'my-3'} />
                                <Typography component='h6' variant='h6' className={'m-0'}>Прогресс:</Typography>
                                <Divider className={'my-3'} />

                                {user.courses_passed !== null ? (
                                    <UserCourseProgress courses={user.courses_passed} />
                                ) : 'Этот пользователь еще не начал проходить курсы.'}
                            </React.Fragment>
                        }
                        {usersBlock &&
                            <React.Fragment>
                                <Divider className={'my-3'} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component='h5' variant='h5' className={'paper-header-text'}>Ученики:</Typography>
                                        <Divider className={'mb-3'} />

                                        {users.students ? users.students.filter(student => student.teather !== null && student.teather.id === teather.id).length === 0 ? <div className='p-3'>У данного учителя нет учеников.</div> : users.students.filter(student => student.teather !== null && student.teather.id === teather.id).map((student, index) => (
                                            <UserAccordionPlane key={index} edit={edit} remove={remove} user={student} />
                                        )) : 'У данного учителя нет учеников.'}

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component='h5' variant='h5' className={'paper-header-text'}>Промоутеры:</Typography>
                                        <Divider className={'mb-3'} />
                                        {users.promouters ? users.promouters.filter(promouter => promouter.teather !== null && promouter.teather.id === teather.id).length === 0 ? <div className='p-3'>У данного учителя нет промоутеров.</div> : users.promouters.filter(promouter => promouter.teather !== null && promouter.teather.id === teather.id).map((promouter, index) => (
                                            <UserAccordionPlane key={index} edit={edit} remove={remove} user={promouter} />
                                        )) : 'У данного учителя нет учеников.'}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        }
                    </div>
                </Accordion>
            }
        </React.Fragment>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { users } = state.users;
    return { jwt, users };
}

const connectedUserAccordionPlane = connect(mapStateToProps)(UserAccordionPlane);
export { connectedUserAccordionPlane as UserAccordionPlane };