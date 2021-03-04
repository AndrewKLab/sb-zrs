import React, { useEffect, useState } from "react";
import { Button, Typography, Grid } from '../_components';
import { DeleteCourseDialog, UpdateCoursePublishDialog } from '../Dialogs';
import { CourseCategory } from './';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export const TeatherCourses = ({ history, panel, courses, course_error, user, create }) => {
    const [courseData, setCourseData] = useState({});

    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
    const openDeleteCourseDialog = (cur_course) => { setDeleteCourseDialog(true), setCourseData(cur_course) }
    const closeDeleteCourseDialog = () => { setDeleteCourseDialog(false) }


    const [updateCoursePublishDialog, setUpdateCoursePublishDialog] = useState(false);
    const openUpdateCoursePublishDialog = (cur_course) => { setUpdateCoursePublishDialog(true), setCourseData(cur_course) }
    const closeUpdateCoursePublishDialog = () => { setUpdateCoursePublishDialog(false) }

    return (
        <div className='h-100'>
            <div className='paper-header d-flex grid-justify-xs-space-between'>
                <Typography component='h4' variant='h4' className={'paper-header-text'}>{create === true ? 'Ваши курсы:' : 'Курсы:'}</Typography>
                {create &&
                    <Button className={'mb-2 mr-3'} onPress={() => { history.push(`/${panel}/create-course`) }} variant='outlined' color="primary">Создать курс</Button>
                }
            </div>
            <DeleteCourseDialog open={deleteCourseDialog} close={closeDeleteCourseDialog} course={courseData} />
            <UpdateCoursePublishDialog open={updateCoursePublishDialog} close={closeUpdateCoursePublishDialog} course={courseData} />
            <div className={`mx-3 mb-3 ${course_error && 'paper-body'}`}>
                {course_error === undefined ? (
                    <React.Fragment>
                        <CourseCategory name={'Основные курсы'} category={courses.basic} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                        <CourseCategory name={'Специальные курсы'} category={courses.special} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                        <CourseCategory name={'Социальные курсы'} category={courses.social} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                        <CourseCategory name={'Национальные курсы'} category={courses.national} deleteDialog={openDeleteCourseDialog} updateDialog={openUpdateCoursePublishDialog} history={history} panel={panel} user={user} />
                    </React.Fragment>
                ) : (
                        <div className={'text-align-center'} style={{ fontSize: 18 }} >
                            <div className={'large-alert'}>
                                <InfoOutlinedIcon style={{ fontSize: 80 }} />
                            </div>
                            <div>{course_error}</div>
                        </div>
                    )}
            </div>
        </div>
    );

};