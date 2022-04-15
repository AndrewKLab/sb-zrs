import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Accordion, Paper, Loading, Typography, Grid, ListItem, ListItemFirstAction, IconButton, Menu, MenuItem, } from '../_components'
import { ProgressCircle } from '../LessonPage'


const ProfilePassedCoursesAccordion = ({ index, course, courses, history }) => {
    const [open, setOpen] = useState(false);

    return (
        <Accordion open={open} setOpen={setOpen} labеl={course.course_name} className={index === courses.length - 1 ? '' : 'border-bottom'}>
            <div className='border-top'>
                {course.lessons.map((lesson, index) =>
                    <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                        <ListItem button >
                            <ListItemFirstAction>
                                {/* <ProgressCircle status={lesson.status} number={lesson.number} /> */}
                                <Typography className={'pl-3'}>{lesson.name}</Typography>
                            </ListItemFirstAction>
                        </ListItem>
                        {/* {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)} */}
                    </div>
                )}
            </div>
        </Accordion >
    );
}

function mapStateToProps(state) {
    const { user, jwt } = state.authentication;
    return { user, jwt};
}

const connectedProfilePassedCoursesAccordion = connect(mapStateToProps)(ProfilePassedCoursesAccordion);
export { connectedProfilePassedCoursesAccordion as ProfilePassedCoursesAccordion };