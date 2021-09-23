import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions } from '../../_actions';
import { Alert, Loading } from '../../_components';
import { CourseRedactor, CourseLessonsRedactor, CourseLessonsList } from '.';

const CourseCountructor = ({
    ...props, className, dispatch,
    jwt, user,
    course, course_loading, course_error, create_course_loading, create_course_error, update_course_loading, update_course_error, delete_course_loading, delete_course_error
}) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [loading, setLoading] = useState(true);
    const course_id = props.location.state !== undefined ? props.location.state.course_id : null;
    const course_autor_id = props.location.state !== undefined ? props.location.state.course_autor_id : null;


    useEffect(() => {
        if (course_id !== null) {
            dispatch(courseActions.readOneCourseById(course_id)).then(() => {
                setLoading(false);
            })
        } else {
            dispatch(courseActions.setCourseEditingStatus('create'));
            setLoading(false);
        }
    }, []);

    if (loading || course_loading) return <Loading />
    if (course_error) return <div className="alert-screen-center"><Alert className='error' severity="error">{course_error}</Alert></div>
    return (
        <div className={`${styleClass} py-3 d-flex gap-10`}>
            <div className={'create-course-body'}>
                <CourseRedactor course_id={course_id} course_autor_id={course_autor_id} />
                <CourseLessonsRedactor/>
            </div>
            <CourseLessonsList />
            
        </div>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { course, course_loading, course_error, create_course_loading, create_course_error, update_course_loading, update_course_error, delete_course_loading, delete_course_error } = state.course_constructor;

    return {
        jwt, user,
        course, course_loading, course_error, create_course_loading, create_course_error, update_course_loading, update_course_error, delete_course_loading, delete_course_error
    };
}

const connectedCourseCountructor = connect(mapStateToProps)(CourseCountructor);

export { connectedCourseCountructor as CourseCountructor }

