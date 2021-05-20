import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions, courseActions } from '../_actions';
import {
    Avatar,
    Accordion,
    Button,
    Dialog,
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
    Menu,
    MenuItem,
    TextInput 
} from '../_components';
import { ProgressCircle } from '../LessonPage';
import { TeatherCourses } from './';
import { UpdateUserAccessDialog, UpdateUserStatusDialog } from '../Dialogs';


const TeatherPanelPage = ({ history, dispatch, user, courses, course_error, students, promouters }) => {
    const [loading, setLoading] = useState(true);
    const [statusDialog, setStatusDialog] = useState(false);
    const [accessDialog, setAccessDialog] = useState(false);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user.roles !== 'ROLE_TEATHER') {
            history.push('/')
        } else {
            dispatch(userActions.getAllStudentsByUser(user.id)).then(
                () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                    () => setLoading(false)))
        }
    }, []);

    const openStatusDialog = (cur_user) => { setStatusDialog(true), setUserData(cur_user) }
    const closeStatusDialog = () => { setStatusDialog(false) }

    const openAccessDialog = (cur_user) => { setAccessDialog(true), setUserData(cur_user) }
    const closeAccessDialog = () => { setAccessDialog(false) }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={'py-3'}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextInput
                    value={`http://localhost:8081/sign-up/${user.id}`}
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
                <Grid item xs={12} sm={6}>
                    <UpdateUserAccessDialog open={accessDialog} close={closeAccessDialog} user={userData} />
                    <UpdateUserStatusDialog open={statusDialog} close={closeStatusDialog} user={userData} />
                    <Typography component='h4' variant='h4'>Ваши ученики:</Typography>
                    <List>
                        {students !== undefined  ? students.map((student, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            <Avatar src={student.avatar} alt={student.firstname + " " + student.lastname} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <ListItemTitle>
                                                {student.firstname + " " + student.lastname}
                                            </ListItemTitle>
                                            <ListItemSubtitle>
                                                Статус: {student.status}
                                            </ListItemSubtitle>
                                        </ListItemText>
                                    </ListItemFirstAction>
                                    <ListItemSecondAction>
                                        <Menu>
                                            <MenuItem onPress={() => openStatusDialog(student)}>Изменить статус ученика</MenuItem>
                                            {student.status === 'УЧЕНИК' || student.status === 'ПРОМОУТЕР' ?
                                                <MenuItem onPress={() => openAccessDialog(student)}>Изменить доступ к курсам</MenuItem> : null
                                            }
                                        </Menu>
                                    </ListItemSecondAction>
                                </ListItem>

                                {student.courses !== undefined && student.courses !== null ? (
                                    <Grid container spacing={2}>
                                        {student.courses.inprocess !== undefined ? (
                                            <Grid item xs={12} sm={student.courses.finished !== undefined ? 6 : 0}>
                                                <Paper>
                                                    <Typography className='m-2' variant="h4" component="h4">Курсы в процессе прохождения:</Typography>
                                                    {student.courses.inprocess.map((course, index) => (
                                                        <Accordion key={index} labеl={course.course_name}>
                                                            <div>
                                                                {course.lessons !== null ? (
                                                                    course.lessons.map((lesson, index) => (
                                                                        <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                            <ListItem button >
                                                                                <ListItemFirstAction>
                                                                                    <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                                </ListItemFirstAction>
                                                                            </ListItem>
                                                                            {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                        </div>
                                                                    ))
                                                                ) : (course.course_name)}
                                                            </div>
                                                        </Accordion>
                                                    ))}
                                                </Paper>
                                            </Grid>
                                        ) : (null)}
                                        {student.courses.finished !== undefined ? (
                                            <Grid item xs={12} sm={student.courses.inprocess !== undefined ? 6 : 0}>
                                                <Paper>
                                                    <Typography className='m-2' variant="h4" component="h4">Пройденные курсы:</Typography>
                                                    {student.courses.finished.map((course, index) => (
                                                        <Accordion key={index} labеl={course.course_name}>
                                                            <div>
                                                                {course.lessons.map((lesson, index) => (
                                                                    <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                        <ListItem button >
                                                                            <ListItemFirstAction>
                                                                                <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                            </ListItemFirstAction>
                                                                        </ListItem>
                                                                        {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Accordion>
                                                    )) }
                                                </Paper>
                                            </Grid>
                                        ) : (null)}

                                    </Grid>
                                ) : (null)}
                                <Divider />
                            </div>
                        )) : 'У вас нет учеников'}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component='h4' variant='h4'>Ваши промоутеры:</Typography>
                    <List>
                        { promouters !== undefined ? promouters.map((student, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            <Avatar src={student.avatar} alt={student.firstname + " " + student.lastname} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <ListItemTitle>
                                                {student.firstname + " " + student.lastname}
                                            </ListItemTitle>
                                            <ListItemSubtitle>
                                                Статус: {student.status}
                                            </ListItemSubtitle>
                                        </ListItemText>
                                    </ListItemFirstAction>
                                    <ListItemSecondAction>
                                        <Menu>
                                            <MenuItem onPress={() => openStatusDialog(student)}>Изменить статус ученика</MenuItem>
                                            {student.status === 'УЧЕНИК' || student.status === 'ПРОМОУТЕР' ?
                                                <MenuItem onPress={() => openAccessDialog(student)}>Изменить доступ к курсам</MenuItem> : null
                                            }
                                        </Menu>
                                    </ListItemSecondAction>
                                </ListItem>

                                {student.courses !== undefined && student.courses !== null ? (
                                    <Grid container spacing={2}>
                                        {student.courses.inprocess !== undefined ? (
                                            <Grid item xs={12} sm={student.courses.finished !== undefined ? 6 : 0}>
                                                <Paper>
                                                    <Typography className='m-2' variant="h4" component="h4">Курсы в процессе прохождения:</Typography>
                                                    {student.courses.inprocess.map((course, index) => (
                                                        <Accordion key={index} labеl={course.course_name}>
                                                            <div>
                                                                {course.lessons !== null ? (
                                                                    course.lessons.map((lesson, index) => (
                                                                        <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                            <ListItem button >
                                                                                <ListItemFirstAction>
                                                                                    <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                                </ListItemFirstAction>
                                                                            </ListItem>
                                                                            {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                        </div>
                                                                    ))
                                                                ) : (course.course_name)}
                                                            </div>
                                                        </Accordion>
                                                    ))}
                                                </Paper>
                                            </Grid>
                                        ) : (null)}
                                        {student.courses.finished !== undefined ? (
                                            <Grid item xs={12} sm={student.courses.inprocess !== undefined ? 6 : 0}>
                                                <Paper>
                                                    <Typography className='m-2' variant="h4" component="h4">Пройденные курсы:</Typography>
                                                    {student.courses.finished.map((course, index) => (
                                                        <Accordion key={index} labеl={course.course_name}>
                                                            <div>
                                                                {course.lessons.map((lesson, index) => (
                                                                    <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                        <ListItem button >
                                                                            <ListItemFirstAction>
                                                                                <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                            </ListItemFirstAction>
                                                                        </ListItem>
                                                                        {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Accordion>
                                                    ))}
                                                </Paper>
                                            </Grid>
                                        ) : (null)}

                                    </Grid>
                                ) : (null)}
                                <Divider />
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