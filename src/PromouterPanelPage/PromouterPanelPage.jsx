import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { userActions } from "../_actions";
import {
    Loading,
    TextInput,
    Avatar,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemSubtitle,
    ListItemText,
    ListItemTitle,
    Grid,
    Paper,
    Typography,
    Accordion
} from '../_components';
import { ProgressCircle } from '../LessonPage';

const PromouterPanelPage = ({ dispatch, history, jwt, user, users }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(userActions.getAllStudentsByPromouter(user.id, jwt)).then(() => setLoading(false))
    }, []);


    if (loading) {
        return <Loading />
    } else {
        return (
            <div className='py-3'>
                <TextInput
                    value={`http://localhost:8081/sign-up/${user.id}/${user.teather_id}`}
                    id="course_name"
                    name="course_name"
                    label="Ваша ссылка промоутера"
                    type={'text'}
                    autoComplete={'off'}
                    variant={'outlined'}
                    onChange={() => { }}
                    className='w-100 mb-3'
                />
                <Typography className='mb-3' variant="h3" component="h3">Пользователи зарегистрировавшиеся по вашей ссылке промоутера:</Typography>
                <List>
                    {users.students !== undefined ? users.students.map((student, index) => {
                        return (
                            <Paper key={index} className='mb-3'>
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
                                </ListItem>
                                
                                {student.courses !== null ? (
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
                                    ) : (null)
                                }
                            </Paper>
                        )
                    }
                    ) : 'У вас нет добавленных учеников'}
                </List>
            </div>
        );
    }


};

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { user, jwt } = authentication;
    return {
        user,
        jwt,
        users
    };
}

const connectedPromouterPanelPage = connect(mapStateToProps)(PromouterPanelPage);
export { connectedPromouterPanelPage as PromouterPanelPage };