import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
    Avatar,
    Accordion,
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
    MenuItem
} from '../_components';
import { ProgressCircle } from '../LessonPage'


class TeatherPanelPage extends React.Component {

    componentDidMount() {
        const { dispatch, history, user } = this.props;
        if (user !== undefined) {
            if (user.roles !== 'ROLE_TEATHER') {
                history.push('/')
            } else {
                dispatch(userActions.getAllStudentsByUser(user.id))
            }
        }
    }

    render() {
        const { loading, students } = this.props;
        if (loading === undefined || loading === true) {
            return <Loading />
        }
        return (
            <div className={'py-3'}>
                <List>
                    {students.map((student, index) => (
                        <div>
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
                                        <MenuItem>Изменить статус ученика</MenuItem>
                                    </Menu>
                                </ListItemSecondAction>
                            </ListItem>

                            {student.courses !== undefined ? (
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
                    ))}
                </List>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { user } = authentication;
    const { loading, students } = users;
    return {
        loading,
        students,
        user
    };
}
const connectedTeatherPanelPage = connect(mapStateToProps)(TeatherPanelPage);
export { connectedTeatherPanelPage as TeatherPanelPage }; 