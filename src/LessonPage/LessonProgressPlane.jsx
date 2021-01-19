import React from 'react'
import { ProgressCircle } from './';
import {
    Paper,
    Typography,
    ListItem,
    ListItemFirstAction,
} from '../_components';
import { lessonActions } from '../_actions';

export const LessonProgressPlane = ({ dispatch, history, lessons, category_name, course, number, user }) => {
    return (
        <Paper>
            <h5 className={'pl-2 mb-0 pt-1'} >Уроки:</h5>
            <div className={'pt-1 w-100'}>
                {lessons.map((lesson, index) => (
                    <div key={index} onClick={() => { dispatch(lessonActions.createLessonPassed(course, lesson.id, user.id)).then(() => history.push(`/courses/${category_name}/${course}/${lesson.id}`)) }}>
                            <ListItem button >
                                <ListItemFirstAction>
                                    <ProgressCircle status={lesson.status} number={lesson.number} />
                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                </ListItemFirstAction>
                            </ListItem>
                        {lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (<div></div>)}
                    </div>
                ))}
            </div>
        </Paper>
    )
}


