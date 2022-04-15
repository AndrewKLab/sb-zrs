import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions, courseActions, chatActions } from '../_actions';
import { Menu, Dropdown } from 'antd';
import {
    Avatar,
    Accordion,
    IconButton,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Loading,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemSecondAction,
    ListItemSubtitle,
    ListItemText,
    ListItemTitle,

    TextInput,
    UserListItem
} from '../_components';
import { ProgressCircle } from '../LessonPage';
import { TeatherCourses } from './';
import { UpdateUserAccessDialog, UpdateUserStatusDialog } from '../Dialogs';
import config from 'config';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import { CreateUserDialog } from '../Dialogs';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const TeatherPanelPage = ({ history, dispatch, jwt, user, courses, course_error, students, promouters }) => {
    const [loading, setLoading] = useState(true);
    const [statusDialog, setStatusDialog] = useState(false);
    const [accessDialog, setAccessDialog] = useState(false);
    const [createUserDialog, setCreateUserDialog] = useState(false);


    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user.role_type !== 'ROLE_TEATHER') {
            history.push('/')
        } else {
            dispatch(userActions.getAllStudentsByUser(user.id)).then(
                () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                    () => setLoading(false)))
        }
    }, []);

    const openCreateUserDialog = () => { setCreateUserDialog(true) }
    const closeCreateUserDialog = () => { setCreateUserDialog(false) }

    const openStatusDialog = (cur_user) => { setStatusDialog(true), dispatch(userActions.selectUser(cur_user)) }
    const closeStatusDialog = () => { setStatusDialog(false) }

    const openAccessDialog = (cur_user) => { setAccessDialog(true), dispatch(userActions.selectUser(cur_user)) }
    const closeAccessDialog = () => { setAccessDialog(false) }
    const dialog = async (user) => {
        await dispatch(chatActions.createChat(jwt, user.id))
        history.push('/dialogs')
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={'py-3'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextInput
                        value={`${config.url}/sign-up/${user.id}`}
                        id="course_name"
                        name="course_name"
                        label="Ваша ссылка промоутера"
                        type={'text'}
                        autoComplete={'off'}
                        variant={'outlined'}
                        onChange={() => { }}
                        className='w-100 mb-3'
                    />
                </Grid>

                <Grid item xs={12}>
                    <Paper square>
                        <TeatherCourses create={true} user={user} courses={courses} course_error={course_error} history={history} panel={'teather-panel'} />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Button onPress={openCreateUserDialog} variant='outlined' color="primary">Создать пользователя</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CreateUserDialog open={createUserDialog} close={closeCreateUserDialog} />
                    <UpdateUserAccessDialog open={accessDialog} close={closeAccessDialog} />
                    <UpdateUserStatusDialog open={statusDialog} close={closeStatusDialog} user={userData} />
                    <Typography component='h4' variant='h4'>Ваши ученики:</Typography>
                    <List>
                        {students && students.length > 0 ? students.map((student, index) => (
                            <div key={index}>
                                <UserListItem button user={student} actions={
                                    <ListItemSecondAction>
                                        <IconButton onClick={() => dialog(student)}>
                                            <ChatBubbleOutlineIcon />
                                        </IconButton>
                                        <Dropdown trigger={['click']} overlay={
                                            <Menu>
                                                <Menu.Item key="1" onClick={() => openStatusDialog(student)}>Изменить статус ученика</Menu.Item>
                                                {student.role_name !== 'Искатель' ? <Menu.Item key="2" onClick={() => openAccessDialog(student)}>Изменить доступ к курсам</Menu.Item> : null}
                                            </Menu>
                                        }>
                                            <IconButton >
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </Dropdown>
                                    </ListItemSecondAction>
                                } />
                            </div>
                        )) : 'У вас нет учеников'}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component='h4' variant='h4'>Ваши промоутеры:</Typography>
                    <List>
                        {promouters && promouters.length > 0 ? promouters.map((student, index) => (
                            <div key={index}>
                                <UserListItem button user={student} actions={
                                    <ListItemSecondAction>
                                        <IconButton onClick={() => dialog(student)}>
                                            <ChatBubbleOutlineIcon />
                                        </IconButton>
                                        <Dropdown trigger={['click']} overlay={
                                            <Menu>
                                                <Menu.Item key="1" onClick={() => openStatusDialog(student)}>Изменить статус ученика</Menu.Item>
                                                {student.role_name !== 'Искатель' ? <Menu.Item key="2" onClick={() => openAccessDialog(student)}>Изменить доступ к курсам</Menu.Item> : null}
                                            </Menu>
                                        }>
                                            <IconButton >
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </Dropdown>
                                    </ListItemSecondAction>
                                } />
                            </div>
                        )) : 'У вас нет своих промоутеров'}
                    </List>
                </Grid>
            </Grid>

        </div>
    );
}

function mapStateToProps(state) {
    const { authentication, users, course } = state;
    const { user, jwt } = authentication;
    const { students, promouters } = users;
    const { courses, course_error } = course;
    return {
        jwt,
        students,
        promouters,
        user,
        courses,
        course_error
    };
}
const connectedTeatherPanelPage = connect(mapStateToProps)(TeatherPanelPage);
export { connectedTeatherPanelPage as TeatherPanelPage };