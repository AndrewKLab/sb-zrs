import React from 'react';
import { connect } from 'react-redux';
import { Answer } from '../LessonPage/Answer'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';


import { lessonActions } from '../_actions';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

import {
    Alert,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Loading,
    Paper,
    Typography,
    Button,
    TextInput,
    FormControlLabel,
    Checkbox,
    Radio,
    SelectItem,
    IconButton,
    Switch
} from '../_components'

class CreateTestPlane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changedQ: false,

            addQuestion: false,
            question: '',
            question_type: 'checkbox',
            editQuestion: '',
        }
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    addQuestion() {
        const { setFieldValue, questions } = this.props;
        const { question, question_type } = this.state;
        this.setState({ changedQ: false })
        questions.push({
            question: question,
            question_type: question_type,
        })
        questions => setFieldValue("lesson_questions", questions)
        console.log(questions)
    }

    render() {
        const { questions } = this.props;
        const { changedQ, addQuestion, question, question_type, editQuestion } = this.state;
        return (
            <div>
                {questions && questions.map((question, index) => (
                    <div key={index} className='d-flex grid-direction-xs-column'>
                        <div className='d-flex grid-direction-xs-column'>
                            {question === editQuestion ?
                                <div className='mt-3'>
                                    <div className='d-flex grid-justify-xs-space-between'>
                                        <TextInput
                                            value={question.question}
                                            id="question_text"
                                            name="question_text"
                                            label="Текст вопроса"
                                            type={'text'}
                                            variant={'outlined'}
                                            onChange={(event) => this.setState({ question: event.target.value, changedQ: true })}
                                            className='w-100 mb-3'
                                        />
                                        <div className='d-flex'>
                                            <IconButton onClick={() => { this.setState({ editQuestion: question }) }}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => { }}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </div>
                                    </div>


                                    <TextInput
                                        select
                                        defaultValue={question_type}
                                        id="question_type"
                                        name="question_type"
                                        label="Тип ответа"
                                        variant={'outlined'}
                                        onChange={(event) => this.setState({ question_type: event.target.value, changedQ: true })}
                                        onSelect={val => setFieldValue("value", val)}

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

                                    {question.answers && question.answers.map((answer, index) => (
                                        <TextInput
                                            key={index}
                                            value={answer.answer}
                                            id={"answer_" + (index + 1)}
                                            name={"answer_" + (index + 1)}
                                            label={"Ответ " + (index + 1)}
                                            type={'text'}
                                            variant={'outlined'}
                                            onChange={(event) => this.setState({ changedQ: true })}
                                            className='w-100 mb-3'
                                        />
                                    ))}
                                </div>
                                :
                                <div>
                                    <div className='d-flex grid-justify-xs-space-between'>
                                        <Typography component="h5" variant="h5" className='mb-2' >{question.question}</Typography>
                                        <div>
                                            <IconButton onClick={() => { this.setState({ editQuestion: question }) }}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => { }}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className='d-flex grid-direction-xs-column ml-3'>
                                    {question.answers && question.answers.map((answer, index) => {

                                        switch (question.question_type) {
                                            case "checkbox":
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        className='w-max'
                                                        control={
                                                            <Checkbox
                                                                type="checkbox"
                                                                name={answer.answer_name}
                                                                value={answer.answer}
                                                            />
                                                        }
                                                        label={answer.answer}
                                                    />
                                                );
                                            case "radio":
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        className='w-max'
                                                        control={
                                                            <Radio
                                                                name={answer.answer_name}
                                                                value={answer.answer}
                                                                onChange={() => { }}
                                                            />
                                                        }
                                                        label={answer.answer}
                                                    />
                                                );
                                            case "text":
                                                return (
                                                    <TextInput
                                                        key={index}
                                                        className={'w-100'}
                                                        type="text"
                                                        label="Ответ"
                                                        name={answer.answer_name}
                                                        value={answer.answer}
                                                        onChange={() => { }}
                                                    />
                                                );

                                            default:
                                                return <div>Неизвестный тип ответа</div>
                                        }

                                    })}
                                    </div>
                                </div>
                            }
                        </div>
                        <Divider />
                    </div>
                ))}
                {addQuestion &&
                    <div>
                        <TextInput
                            value={question}
                            id="question_text"
                            name="question_text"
                            label="Текст вопроса"
                            type={'text'}
                            autoComplete="lesson_videolink"
                            variant={'outlined'}
                            onChange={(event) => this.setState({ question: event.target.value, changedQ: true })}
                            className='w-100 mb-3'
                        />

                        <TextInput
                            select
                            defaultValue={question_type}
                            id="question_type"
                            name="question_type"
                            label="Тип ответа"
                            autoComplete="course_category_name"
                            variant={'outlined'}
                            onChange={(event) => this.setState({ question_type: event.target.value, changedQ: true })}
                            onSelect={val => setFieldValue("value", val)}

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

                        {question.answers && question.answers.map((answer, index) => (
                            <TextInput
                                value={answer.answer}
                                id={"answer_" + index}
                                name={"answer_" + index}
                                label={"Ответ " + index}
                                type={'text'}
                                variant={'outlined'}
                                onChange={(event) => this.setState({ changedQ: true })}
                                className='w-100 mb-3'
                            />
                        ))}

                    </div>
                }
                {addQuestion === true ?
                    <Button disabled={changedQ === false} onPress={() => this.addQuestion()}>{'Сохранить вопрос'}</Button>
                    :
                    <Button onPress={() => this.setState({ addQuestion: true })}>{'Добавить вопрос'}</Button>
                }

            </div>
        );
    }
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

const connectedCreateTestPlane = connect(mapStateToProps)(CreateTestPlane);
export { connectedCreateTestPlane as CreateTestPlane };