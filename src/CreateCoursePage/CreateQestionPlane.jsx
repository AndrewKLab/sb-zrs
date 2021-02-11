import React, { useState } from 'react';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { lessonActions } from '../_actions';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Loading,
    Paper,
    Typography,
    Button,
    TextInput,
    SelectItem,
    Switch
} from '../_components'



const CreateQestionPlane = ({setFieldValue, questions}) => {
    const [changed, setChanged] = useState(false);
    const [question_text, setQuestion_text] = useState('')
    const [question_type, setQuestion_type] = useState('checkbox')

    const changeQuestionText = (event) => { setQuestion_text(event.target.value), setChanged(true) }
    const changeQuestionType = (event) => { setQuestion_type(event.target.value), setChanged(true) }
    
    //создать вопрос
    const createQestion = () => {
        setChanged(false),
        questions.push({question: question_text, question_type: question_type})
        setFieldValue("lesson_questions", questions)
    }


    return (
        <div>
            <TextInput
                value={question_text}
                id="question_text"
                name="question_text"
                label="Текст вопроса"
                type={'text'}
                autoComplete="lesson_videolink"
                variant={'outlined'}
                onChange={changeQuestionText}
                className='w-100 mb-3'
            />

            <TextInput
                select
                defaultValue={question_type}
                id="question_type"
                name="question_type"
                label="Тип ответа"
                variant={'outlined'}
                onChange={changeQuestionType}
                InputProps={{
                    endAdornment: (
                        <ExpandMoreIcon />
                    ),
                }}
                className='w-100 mb-3'
            >
                <SelectItem selectded={question_type === 'checkbox'} value={'checkbox'}>Несколько верных ответов</SelectItem>
                <SelectItem selectded={question_type === 'radio'} value={'radio'}>Один верный ответ</SelectItem>
                <SelectItem selectded={question_type === 'text'} value={'text'}>Текстовый ответ</SelectItem>
            </TextInput>
            
            <Button disabled={!changed} onPress={createQestion}>{'Добавить вопрос'}</Button>

        </div>
    )
}


function mapStateToProps(state) {
    const { authentication, lesson } = state;
    const { user, jwt } = authentication;
    const { message, lesson_error, data } = lesson
    return {
        user,
        jwt,
        message,
        lesson_error,
        data
    };
}

const connectedCreateQestionPlane = connect(mapStateToProps)(CreateQestionPlane);
export { connectedCreateQestionPlane as CreateQestionPlane };