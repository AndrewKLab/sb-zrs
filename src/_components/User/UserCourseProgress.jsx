import React from 'react'
import {
    Grid,
    ListItem,
    ListItemFirstAction,
    Paper,
    Typography,
    Accordion
} from '../';

import { ProgressCircle } from '../../LessonPage';

export const UserCourseProgress = ({ className, courses }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    return (
        <Grid container spacing={2} className={styleClass}>
            {courses.inprocess !== undefined ? (
                <Grid item xs={12}>
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
                                                        <Typography className={'pl-3 step-text text-align-left'}>{lesson.name}</Typography>
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
                <Grid item xs={12}>
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
                                                    <Typography className={'pl-3 step-text text-align-left'}>{lesson.name}</Typography>
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
    )
}


