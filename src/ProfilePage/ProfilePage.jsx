import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { userActions, courseActions } from '../_actions';

import { Avatar, Accordion, Paper, Loading, Typography, Grid, ListItem, ListItemFirstAction, IconButton, } from '../_components'
import { UpdateUserDialog } from '../Dialogs';
import { ProgressCircle } from '../LessonPage'
import { ProfilePassedCoursesPlane } from './'
import { Menu, Dropdown } from 'antd';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SettingsIcon from '@material-ui/icons/Settings';

const ProfilePage = ({ dispatch, user, jwt, history, courses }) => {
    const [updateUserDialog, setUpdateUserDialog] = useState(false);

    useEffect(() => {
        if (user != null) {
            dispatch(courseActions.getAllPassedCourseByUser(user.id, jwt))
        }
    }, [])

    const openUpdateUserDialog = (user) => {
        dispatch(userActions.selectUser(user))
        setUpdateUserDialog(true)
    }
    const closeUpdateUserDialog = () => {
        setUpdateUserDialog(false)
    }

    const uploadAvatar = (event, form) => {
        event.preventDefault()
        const formData = new FormData(form)
        var avatar = formData.get('avatar')
        console.log(avatar)
        dispatch(userActions.updateSelf(jwt, { ...user, avatar }))
    }

    if (user == null) return <Loading />;
    return (
        <div className={'py-3'}>
            <UpdateUserDialog open={updateUserDialog} close={closeUpdateUserDialog} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} >
                    <Paper className={'profile p-3 h-100'}>
                        <Grid item sm={3} md={3} xs={3}>
                            <Avatar className={'profile-avatar'} src={user.avatar} alt={user.firstname + ' ' + user.lastname} edit editAction={uploadAvatar} />
                        </Grid>
                        <Grid item sm={8} md={8} xs={8}>
                            <div className='p-3'>
                                <Typography variant="h4" component="h4">{user.firstname + ' ' + user.lastname}</Typography>
                                <Typography variant="h6" component="h6"><strong>Статус:</strong> {user.role_name}</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={1} md={1} xs={1} className={"h-100 d-flex justify-content-end"}>
                            <Dropdown trigger={['click']} overlay={
                                <Menu>
                                    <Menu.Item key="1" onClick={() => openUpdateUserDialog(user)}>Изменить личную информацию</Menu.Item>
                                </Menu>
                            }>
                                <IconButton >
                                    <SettingsIcon />
                                </IconButton>
                            </Dropdown>

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Paper className={'p-3 h-100'}>
                        {user.phonenumber && <Typography variant="body" component="body"><strong>Номер телефона: </strong>{user.phonenumber}</Typography>}
                        {user.email && <Typography variant="body" component="body"><strong>Email: </strong>{user.email}</Typography>}
                        {user.country && <Typography variant="body" component="body"><strong>Страна: </strong>{user.country}</Typography>}
                        {user.sity && <Typography variant="body" component="body"><strong>Город: </strong>{user.sity}</Typography>}
                        {user.commune && <Typography variant="body" component="body"><strong>Община: </strong>{user.commune}</Typography>}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {courses ? (
                        <Grid container spacing={2}>
                            {courses.inprocess ? (
                                <Grid item xs={12} sm={courses.finished ? 6 : 12}>
                                    <ProfilePassedCoursesPlane title={'Курсы в процессе прохождения:'} courses={courses.inprocess} history={history} />
                                </Grid>
                            ) : (null)}
                            {courses.finished ? (
                                <Grid item xs={12} sm={courses.inprocess ? 6 : 12}>
                                    <ProfilePassedCoursesPlane title={'Пройденные курсы:'} courses={courses.finished} history={history} />
                                </Grid>
                            ) : (null)}

                        </Grid>
                    ) : (null)}
                </Grid>
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    const { authentication, course } = state;
    const { user, jwt } = authentication;
    const { loading, courses } = course;
    return {
        user,
        jwt,
        loading,
        courses
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };