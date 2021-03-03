import React, { useEffect, useState } from "react";
import { Button, Typography, Grid } from '../_components';
import { DeleteCourseDialog, UpdateCoursePublishDialog } from '../Dialogs';
import { CourseCategory } from './';

export const TeatherCourses = ({ history, panel, courses, course_error, user, create }) => {
    const [courseData, setCourseData] = useState({});

    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
    const openDeleteCourseDialog = (cur_course) => { setDeleteCourseDialog(true), setCourseData(cur_course) }
    const closeDeleteCourseDialog = () => { setDeleteCourseDialog(false) }


    const [updateCoursePublishDialog, setUpdateCoursePublishDialog] = useState(false);
    const openUpdateCoursePublishDialog = (cur_course) => { setUpdateCoursePublishDialog(true), setCourseData(cur_course) }
    const closeUpdateCoursePublishDialog = () => { setUpdateCoursePublishDialog(false) }

    return (
        <Grid item xs={12} sm={12}>
            <Typography component='h4' variant='h4'>{create === true ? 'Ваши курсы:' : 'Курсы:'}</Typography>
            {create &&
                <div className='d-flex grid-justify-xs-flex-end w-100'>
                    <Button onPress={() => { history.push(`/${panel}/create-course`) }} variant='outlined' color="primary">Создать курс</Button>
                </div>
            }
            <DeleteCourseDialog open={deleteCourseDialog} close={closeDeleteCourseDialog} course={courseData} />
            <UpdateCoursePublishDialog open={updateCoursePublishDialog} close={closeUpdateCoursePublishDialog} course={courseData} />
            {course_error === undefined ? (
                <div>
                    <CourseCategory name={'Основные курсы'} category={courses.basic} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                    <CourseCategory name={'Специальные курсы'} category={courses.special} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                    <CourseCategory name={'Социальные курсы'} category={courses.social} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                    <CourseCategory name={'Национальные курсы'} category={courses.national} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                </div>
            ) : (
                    <div>
                        <div>{course_error}</div>
                    </div>
                )}
        </Grid>
    );

};