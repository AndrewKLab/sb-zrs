import React from 'react'
import { ProgressCircle } from './';
import {
    Paper,
    Typography,
    ListItem,
    ListItemFirstAction,
} from '../_components';
import { Link } from 'react-router-dom';

export const LessonProgressPlane = ({ lessons, category_name, course }) => {
    return (
        <Paper>
            <h5 className={'pl-2 mb-0 pt-1'} >Уроки:</h5>
            <div className={'pt-1 w-100'}>
                {lessons.map((lesson, index) => (
                    <div key={index}>
                        <Link to={`/courses/${category_name}/${course}/${lesson.id}`}
                        // onClick={() => { this.updateLessonProgress(course_id, lesson.id, user.id, user.teather_id); this.getFinishedLessons(course, user.id); }}
                        >
                            <ListItem button >
                                <ListItemFirstAction>
                                    <ProgressCircle status={lesson.status} number={lesson.number} />
                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                </ListItemFirstAction>
                            </ListItem>
                        </Link>
                        {lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (<div></div>)}
                    </div>
                ))}
            </div>
        </Paper>
    )
}


