import React, { useState } from 'react';
import config from 'config';
import {
    Button,
} from '../_components';


export const CourseActionButton = ({ history, user, course, enroll, create_passed_course_loading, delete_all_passed_lessons_by_course_loading }) => {
    if (course.passed_course_status === "finished") {
        return <Button disabled={create_passed_course_loading || delete_all_passed_lessons_by_course_loading} loading={create_passed_course_loading || delete_all_passed_lessons_by_course_loading} variant="contained" color="inherit" onPress={() => enroll(user.id, course)}>Пройти еще раз</Button>
    } else if (course.passed_course_status === "inprocess") {
        return <div className="pagination w-100 gap-3 grid-wrap-xs-wrap">
            <Button variant='contained' onPress={() => history.push(`/courses/${course.category_name}/${course.course_id}/${course.lessons[0].id}`)}>Перейти к курсу</Button>
            <Button variant='contained' onPress={() => enroll()}>Прекратить прохождение курса</Button>
        </div>
    } 
    // else if (Number(user.teather_id) === 0 && user.role_type === "ROLE_USER") { 
    //     return <Button disabled={true} variant="contained" color="secondary">Записаться на курс</Button>
    // } 
    
    else {
        return <Button variant="contained" color="secondary" onPress={() => enroll()}>Записаться на курс</Button>
    }
}