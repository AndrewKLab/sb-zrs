import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { userActions } from "../../_actions";
import { Grid, Avatar, Typography, Button, } from "../../_components";
import moment from 'moment';
import { Divider } from "antd";
import { UserInfoCoursesAccordion } from "./";

const UserInfoCoursesPlane = ({ user }) => {
    const [courses_status, setCoursesStatus] = useState('inprocess')
    const showCoursesByStatus = (status) => {
        setCoursesStatus(status)
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <Typography variant={'h5'} component={'h5'}>Информация о курсах</Typography>
                <Divider className="m-0" />
            </Grid>
            <Grid item className={'d-flex gap-3'} xs={12} sm={12}>
                <Button variant={courses_status === 'inprocess' ? 'contained' : 'outlined'} onPress={() => showCoursesByStatus('inprocess')}>В процессе</Button>
                <Button variant={courses_status === 'finished' ? 'contained' : 'outlined'} onPress={() => showCoursesByStatus('finished')}>Завершенные</Button>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <div className={'border'}>
                            {user.courses && user.courses.map((course, index) =>
                                <React.Fragment>
                                    {courses_status === 'inprocess' && course.status === 'inprocess' && <UserInfoCoursesAccordion key={index} index={index} course={course} courses={user.courses} />}
                                    {courses_status === 'finished' && course.status === 'finished' && <UserInfoCoursesAccordion key={index} index={index} course={course} courses={user.courses} />}
                                </React.Fragment>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { selected_user, read_full_info_by_user_loading, read_full_info_by_user_message, read_full_info_by_user_error } = state.users;

    return {
        jwt,
        selected_user,
        read_full_info_by_user_loading,
        read_full_info_by_user_message,
        read_full_info_by_user_error,
    };
}
const connectedUserInfoCoursesPlane = connect(mapStateToProps)(UserInfoCoursesPlane);
export { connectedUserInfoCoursesPlane as UserInfoCoursesPlane };