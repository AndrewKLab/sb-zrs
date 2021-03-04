import React from 'react';
import { connect } from 'react-redux';

import { userActions, courseActions } from '../_actions';

import { Avatar, Accordion, Paper, Loading, Typography, Grid, ListItem, ListItemFirstAction } from '../_components'
import { ProgressCircle } from '../LessonPage'

class ProfilePage extends React.Component {

    componentDidMount() {
        const { dispatch, user } = this.props;
        if (user != undefined) {
            dispatch(courseActions.getAllPassedCourseByUser(user.id))
        }
    }

    render() {
        const { history, user, courses } = this.props;
        if (user == undefined) {
            return <Loading />
        }
        return (
            <div className={'py-3'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={'profile p-3'}>
                            <Avatar className={'profile-avatar'} src={user.avatar} alt={user.firstname + ' ' + user.lastname} />
                            <div className='p-3'>
                                <Typography variant="h4" component="h4">{user.firstname + ' ' + user.lastname}</Typography>
                                <Typography variant="h6" component="h6"><strong>Статус:</strong> {user.status}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={'p-3'}>
                            <Typography variant="body" component="body"> {user.sity && <div><strong>Номер телефона: </strong>{user.phonenumber}</div>}</Typography>
                            <Typography variant="body" component="body"> {user.country && <div><strong>Страна: </strong>{user.country}</div>}</Typography>
                            <Typography variant="body" component="body"> {user.sity && <div><strong>Город: </strong>{user.sity}</div>}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {courses !== undefined ? (
                            <Grid container spacing={2}>
                                {courses.inprocess !== undefined ? (
                                    <Grid item xs={12} sm={courses.finished !== undefined ? 6 : 0}>
                                        <Paper>
                                            <Typography className='m-2' variant="h4" component="h4">Курсы в процессе прохождения:</Typography>
                                            {courses.inprocess.map((course, index) => (
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
                                {courses.finished !== undefined ? (
                                    <Grid item xs={12} sm={courses.inprocess !== undefined ? 6 : 0}>
                                        <Paper>
                                            <Typography className='m-2' variant="h4" component="h4">Пройденные курсы:</Typography>
                                            {courses.finished.map((course, index) => (
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, course } = state;
    const { user } = authentication;
    const { loading, courses } = course;
    return {
        user,
        loading,
        courses
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };