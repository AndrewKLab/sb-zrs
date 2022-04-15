import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Accordion, Paper, Loading, Typography, Grid, ListItem, ListItemFirstAction, IconButton, Menu, MenuItem, } from '../_components'
import { ProgressCircle } from '../LessonPage'
import { ProfilePassedCoursesAccordion } from './'


const ProfilePassedCoursesPlane = ({ courses, title, history }) => {
    return (
        <Paper>
            <Typography className='p-3 m-0 border-bottom' variant="h5" component="h5">{title}</Typography>
            {courses.map((course, index) => course.lessons && course.lessons.length > 0 ? <ProfilePassedCoursesAccordion history={history} key={index} index={index} courses={courses} course={course} /> : null)}
        </Paper>
    );
}

function mapStateToProps(state) {
    const { user, jwt } = state.authentication;
    return { user, jwt };
}

const connectedProfilePassedCoursesPlane = connect(mapStateToProps)(ProfilePassedCoursesPlane);
export { connectedProfilePassedCoursesPlane as ProfilePassedCoursesPlane };