import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions } from '../../_actions';
import { Alert, Loading, Paper, TextInput, SelectItem, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '../../_components';
import Dropzone from "react-dropzone";
import Thumb from "../../_components/Thumb";
import { Formik, Form } from "formik";
import * as yup from "yup";



//icons
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CreateCoursePage } from '../../CreateCoursePage';

const CourseLessonsRedactor = ({
    ...props, className, dispatch,
    jwt, user,
    lesson_editing_status, selected_lesson
}) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    if(selected_lesson === null) return null;
    return (
        <Paper className={`${styleClass} p-3 mt-3`}>
            {JSON.stringify(selected_lesson)}
        </Paper>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { lesson_editing_status, selected_lesson } = state.course_constructor;

    return {
        jwt, user,
        lesson_editing_status, selected_lesson
    };
}

const connectedCourseLessonsRedactor = connect(mapStateToProps)(CourseLessonsRedactor);

export { connectedCourseLessonsRedactor as CourseLessonsRedactor }

