import React, { useEffect } from 'react'
import { ProgressCircle } from './';
import {
    Paper,
    Typography,
    ListItem,
    ListItemFirstAction,
} from '../_components';
import { lessonActions } from '../_actions';

export const LessonProgressPlane = ({ dispatch, history, course, user }) => {
    const selectLesson = (lesson) => {
        //dispatch(lessonActions.setInprocessLesson(course.lessons.find((item) => item.id === lesson.id)))
        history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`);
    }
    return (
        <Paper>
            <h5 className={'pl-2 mb-0 pt-1 step-title'} >Уроки:</h5>
            <div className={'pt-1 w-100'}>
                {course.lessons.map((lesson, index) => (
                    <div key={index} onClick={() => selectLesson(lesson)}>
                        <ListItem button className="step-button">
                            <ListItemFirstAction>
                                <ProgressCircle status={lesson.status} number={lesson.number} />
                                <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                            </ListItemFirstAction>
                        </ListItem>
                        {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (<div></div>)}
                    </div>
                ))}
            </div>
        </Paper>
    )
}


