import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions, lessonActions } from '../../_actions';
import { Alert, Loading, Typography, IconButton, TextInput, FormControlLabel, Radio, Checkbox, Divider, Button, SelectItem } from '../../_components';

//icons
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { NightsStayTwoTone } from '@material-ui/icons';

const CourseLessonsTestRedactor = ({
    ...props, className, dispatch,
    jwt, user,
    course,
    course_loading,
    course_error,
    create_course_loading,
    create_course_error,
    update_course_loading,
    update_course_error,
    delete_course_loading,
    delete_course_error,

    lesson_test_editing_status,
    selected_lesson,
    selected_question,
    lesson_editing_status
}) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const InitialselectedQuestionState = {
        question_text: "",
        question_type: "checkbox",
        question_answers: [],

        //errors
        question_text_error: "",
        question_answers_error: ""
    }
    const [selectedQuestionState, setSelectedQuestionState] = useState(InitialselectedQuestionState);

    //QUESTION
    const createQestion = () => {
        dispatch(lessonActions.selectLessonTestQuestion(""))
        setSelectedQuestionState(InitialselectedQuestionState)
    }

    const saveQestion = () => {
        //dispatch(lessonActions.selectLessonTestQuestion(""))
        if (selectedQuestionState.question_text) {
            if (selectedQuestionState.question_answers.filter(item => selectedQuestionState.question_type !== 'text' && item.answer_answer === "").length > 0) {
                setSelectedQuestionState({ ...selectedQuestionState, question_answers: selectedQuestionState.question_answers.map((answer, i) => selectedQuestionState.question_type !== 'text' && answer.answer_answer === "" ? { ...answer, answer_error: 'Это поле является обязательным для заполнения.' } : answer) })
            } else {
                if (selectedQuestionState.question_answers.length > 0)
                    if (selected_question !== null && selected_question !== "") {
                        dispatch(lessonActions.updateLessonTestQuestion(selectedQuestionState))
                    } else {
                        dispatch(lessonActions.createLessonTestQuestion({ ...selectedQuestionState, question_id: `q-${selected_lesson.lesson_questions ? selected_lesson.lesson_questions.length : 0}` }))
                    } else {
                    setSelectedQuestionState({ ...selectedQuestionState, question_answers_error: 'Необходимо добавить хотябы один ответ.' })
                }
            }
        } else {
            setSelectedQuestionState({ ...selectedQuestionState, question_text_error: 'Это поле является обязательным для заполнения.' })
        }
    }

    const deleteQestion = (question_index) => {
        dispatch(lessonActions.deleteLessonTestQuestion(question_index))
    }

    const selectQestion = (question, index) => {
        setSelectedQuestionState({ ...question, question_text_error: "", question_answers_error: "" })
        dispatch(lessonActions.selectLessonTestQuestion(question, index))
    }

    const cancelQestion = () => {
        dispatch(lessonActions.selectLessonTestQuestion(null))
        setSelectedQuestionState(InitialselectedQuestionState)
    }

    //ANSWERS
    const createAnswer = () => {
        setSelectedQuestionState({
            ...selectedQuestionState,
            question_answers: selectedQuestionState.question_answers ? [...selectedQuestionState.question_answers, {
                answer_name: null,
                answer_answer: "",
                answer_current: "0",
                answer_error: "",
            }] : [{
                answer_name: null,
                answer_answer: "",
                answer_current: "0",
                answer_error: "",
            }]
        })
    }

    const deleteAnswer = (answer_index) => {
        setSelectedQuestionState({
            ...selectedQuestionState,
            question_answers: selectedQuestionState.question_answers.filter((answer, index) => index !== answer_index)
        })
    }

    const setCurrentAnswer = (answer_index) => {
        setSelectedQuestionState({
            ...selectedQuestionState,
            question_answers: selectedQuestionState.question_answers.map((answer, index) => {
                switch (selectedQuestionState.question_type) {
                    case "checkbox":
                        return index !== answer_index ? answer : { ...answer, answer_current: answer.answer_current === "1" ? "0" : "1" }
                    case "radio":
                        return index !== answer_index ? { ...answer, answer_current: "0" } : { ...answer, answer_current: "1" }
                    case "text":
                        return { ...answer, answer_current: "1" }
                    default:
                        return index !== answer_index ? { ...answer, answer_current: "0" } : { ...answer, answer_current: "1" }
                }
            })

        })
    }

    if (!lesson_test_editing_status) return null
    return (
        <div className={`${styleClass}`}>
            {/* Список вопросов */}
            {selected_lesson !== "" && selected_lesson.lesson_questions !== null && selected_lesson.lesson_questions.length > 0 &&
                <div>
                    <Divider />
                    <div className={"p-3"}>
                        {selected_lesson.lesson_questions !== null && selected_lesson.lesson_questions.length > 0 && selected_lesson.lesson_questions.map((question, index) => {
                            return selected_question !== null && selected_question !== "" && selected_question.question_index === index ? (
                                <div key={index}>
                                    {/* Редактировать вопрос */}
                                    <Typography component="h5" variant="h5" className={"mb-3"} >{'Вопрос:'}</Typography>
                                    <TextInput
                                        value={selectedQuestionState.question_text}
                                        id="question_text"
                                        name="question_text"
                                        label="Текст вопроса"
                                        type={'text'}
                                        autoComplete="question_text"
                                        variant={'outlined'}
                                        onChange={(val) => setSelectedQuestionState({ ...selectedQuestionState, question_text: val.target.value, question_text_error: "" })}
                                        className='w-100 mb-3'
                                        helperText={
                                            selectedQuestionState.question_text_error
                                                ? selectedQuestionState.question_text_error
                                                : null
                                        }
                                    />

                                    <TextInput
                                        select
                                        defaultValue={selectedQuestionState.question_type}
                                        id="question_type"
                                        name="question_type"
                                        label="Тип ответа"
                                        variant={'outlined'}
                                        onChange={(val) =>
                                            setSelectedQuestionState({
                                                ...selectedQuestionState,
                                                question_type: val.target.value,
                                                question_answers: val.target.value === 'text' ? [{
                                                    answer_name: null,
                                                    answer_answer: "",
                                                    answer_current: "0",
                                                    answer_error: ""
                                                }] : selectedQuestionState.question_answers.map((answer, index) => { return ({ ...answer, answer_current: "0" }) })
                                            })
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <ExpandMoreIcon />
                                            ),
                                            endAdornmentClass: 'select-arrow'
                                        }}

                                        className='w-100 mb-3'
                                    >
                                        <SelectItem selectded={selectedQuestionState.question_type === 'checkbox'} value={'checkbox'}>Несколько верных ответов</SelectItem>
                                        <SelectItem selectded={selectedQuestionState.question_type === 'radio'} value={'radio'}>Один верный ответ</SelectItem>
                                        <SelectItem selectded={selectedQuestionState.question_type === 'text'} value={'text'}>Текстовый ответ</SelectItem>
                                    </TextInput>

                                    {selectedQuestionState.question_answers && selectedQuestionState.question_answers.length !== 0 &&
                                        <table className={`${selectedQuestionState.question_type === 'text' ? 'd-none' : 'd-block'} w-100`}>
                                            <tbody>
                                                <tr>
                                                    <th className='pb-2'>Ответы</th>
                                                    {selectedQuestionState.question_type !== 'text' && <th className='text-align-end pb-2'>Правильный ответ</th>}
                                                    <th className='text-align-end pb-2'>Действия</th>
                                                </tr>
                                                {selectedQuestionState.question_answers.map((answer, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <TextInput
                                                                className='w-100 mb-3'
                                                                value={answer.answer_answer}
                                                                id={"answer_" + (index + 1)}
                                                                name={"answer_" + (index + 1)}
                                                                label={"Ответ " + (index + 1)}
                                                                type={'text'}
                                                                variant={'outlined'}
                                                                onChange={(val) => setSelectedQuestionState({
                                                                    ...selectedQuestionState,
                                                                    question_answers: selectedQuestionState.question_answers.map((item, inx) => inx === index ? { ...item, answer_answer: val.target.value, answer_error: "" } : item)
                                                                })}
                                                                helperText={answer.answer_error !== "" ? answer.answer_error : null
                                                                }
                                                            />
                                                        </td>
                                                        {selectedQuestionState.question_type !== 'text' &&
                                                            <td className='text-align-end'>
                                                                {selectedQuestionState.question_type === 'text' ?
                                                                    answer.answer_answer
                                                                    :
                                                                    <IconButton onClick={() => setCurrentAnswer(index)}>
                                                                        {answer.answer_current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                    </IconButton>
                                                                }
                                                            </td>
                                                        }
                                                        <td className='text-align-end'>
                                                            <IconButton onClick={() => deleteAnswer(index)}>
                                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>}
                                    {selectedQuestionState.question_type === 'text' ? null : <Button fullWidth onPress={createAnswer}>{'Добавить ответ'}</Button>}
                                    <Divider />
                                    <div className='d-flex grid-justify-xs-space-between grid-align-items-xs-center'>
                                        <div>
                                            {selectedQuestionState.question_answers_error !== '' && (
                                                <Alert className='error' severity="error">{selectedQuestionState.question_answers_error}</Alert>
                                            )}
                                        </div>
                                        <div className='d-flex grid-justify-xs-flex-end '>
                                            <Button onPress={saveQestion} className='mr-3'>{'Сохранить вопрос'}</Button>
                                            <Button onPress={cancelQestion}>{'Отмена'}</Button>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                            ) : (
                                <div key={index} className='d-flex grid-direction-xs-column'>
                                    <div className='d-flex grid-justify-xs-space-between'>
                                        <Typography component="h5" variant="h5" className='mb-2' >{question.question_text}</Typography>
                                        <div>
                                            <IconButton onClick={() => selectQestion(question, index)}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => deleteQestion(index)}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className={`${question.question_type === 'text' ? 'd-none' : 'd-flex'} grid-direction-xs-column ml-3 mr-3`}>
                                        <table  className={`${question.question_type === 'text' ? 'd-none' : 'd-block'} w-100`}>
                                            <tbody>
                                                <tr>
                                                    <th>Ответы</th>
                                                    <th className='text-align-end'>Правильный  ответ</th>
                                                </tr>
                                                {question.question_answers !== null && question.question_answers.map((answer, index) => {

                                                    switch (question.question_type) {
                                                        case "checkbox":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    type="checkbox"
                                                                                    name={answer.answer_id}
                                                                                    value={answer.answer_answer}
                                                                                />
                                                                            }
                                                                            label={answer.answer_answer}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.answer_current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        case "radio":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Radio
                                                                                    name={answer.answer_name}
                                                                                    value={answer.answer_answer}
                                                                                    onChange={() => { }}
                                                                                />
                                                                            }
                                                                            label={answer.answer_answer}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.answer_current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        case "text":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <TextInput
                                                                            className={'w-100'}
                                                                            type="text"
                                                                            label="Ответ"
                                                                            name={answer.answer_name}
                                                                            value={answer.answer_answer}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.answer_answer}
                                                                    </td>
                                                                </tr>
                                                            );

                                                        default:
                                                            return <div>Неизвестный тип ответа</div>
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {index !== selected_lesson.lesson_questions.length - 1 ? <Divider /> : null}
                                </div>

                            )
                        }
                        )}
                    </div>
                </div>
            }
            {/* Создать вопрос */}
            {selected_question === "" &&
                <div>
                    <Divider />
                    <Typography component="h5" variant="h5" className={"mb-3"} >{'Вопрос:'}</Typography>
                    <TextInput
                        value={selectedQuestionState.question_text}
                        id="question_text"
                        name="question_text"
                        label="Текст вопроса"
                        type={'text'}
                        autoComplete="question_text"
                        variant={'outlined'}
                        onChange={(val) => setSelectedQuestionState({ ...selectedQuestionState, question_text: val.target.value, question_text_error: "" })}
                        className='w-100 mb-3'
                        helperText={
                            selectedQuestionState.question_text_error
                                ? selectedQuestionState.question_text_error
                                : null
                        }
                    />

                    <TextInput
                        select
                        defaultValue={selectedQuestionState.question_type}
                        id="question_type"
                        name="question_type"
                        label="Тип ответа"
                        variant={'outlined'}
                        onChange={(val) =>
                            setSelectedQuestionState({
                                ...selectedQuestionState,
                                question_type: val.target.value,
                                question_answers: val.target.value === 'text' ? [{
                                    answer_name: null,
                                    answer_answer: "",
                                    answer_current: "0",
                                    answer_error: ""
                                }] : selectedQuestionState.question_answers.map((answer, index) => { return ({ ...answer, answer_current: "0" }) })
                            })
                        }
                        InputProps={{
                            endAdornment: (
                                <ExpandMoreIcon />
                            ),
                            endAdornmentClass: 'select-arrow'
                        }}
                        className='w-100 mb-3'
                    >
                        <SelectItem selectded={selectedQuestionState.question_type === 'checkbox'} value={'checkbox'}>Несколько верных ответов</SelectItem>
                        <SelectItem selectded={selectedQuestionState.question_type === 'radio'} value={'radio'}>Один верный ответ</SelectItem>
                        <SelectItem selectded={selectedQuestionState.question_type === 'text'} value={'text'}>Текстовый ответ</SelectItem>
                    </TextInput>

                    {selectedQuestionState.question_answers.length !== 0 &&
                        <table className={`${selectedQuestionState.question_type === 'text' ? 'd-none' : 'd-block'} w-100`}>
                            <tbody>
                                <tr>
                                    <th className='pb-2'>Ответы</th>
                                    <th className='text-align-end pb-2'>Правильный ответ</th>
                                    <th className='text-align-end pb-2'>Действия</th>
                                </tr>
                                {selectedQuestionState.question_answers.map((answer, index) => (
                                    <tr key={index}>
                                        <td>
                                            <TextInput
                                                className='w-100 mb-3'
                                                value={answer.answer_answer}
                                                id={"answer_" + (index + 1)}
                                                name={"answer_" + (index + 1)}
                                                label={"Ответ " + (index + 1)}
                                                type={'text'}
                                                variant={'outlined'}
                                                onChange={(val) => setSelectedQuestionState({
                                                    ...selectedQuestionState,
                                                    question_answers: selectedQuestionState.question_answers.map((item, inx) => inx === index ? { ...item, answer_answer: val.target.value, answer_error: "" } : item)
                                                })}
                                                helperText={answer.answer_error !== "" ? answer.answer_error : null
                                                }
                                            />
                                        </td>
                                        <td className='text-align-end'>
                                            {selectedQuestionState.question_type === 'text' ?
                                                answer.answer_answer
                                                :
                                                <IconButton onClick={() => setCurrentAnswer(index)}>
                                                    {answer.answer_current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                </IconButton>
                                            }
                                        </td>
                                        <td className='text-align-end'>
                                            <IconButton onClick={() => deleteAnswer(index)}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    {selectedQuestionState.question_type === 'text' ? null : <Button fullWidth onPress={createAnswer}>{'Добавить ответ'}</Button>}
                </div>
            }



            {selected_question === null &&
                <div>
                    <Divider />
                    <div className='d-flex grid-justify-xs-flex-end '>
                        <Button onPress={createQestion}>{'Добавить вопрос'}</Button>
                    </div>
                </div>
            }
            {selected_question === "" &&
                <div>
                    <Divider />
                    <div className='d-flex grid-justify-xs-space-between grid-align-items-xs-center'>
                        <div>
                            {selectedQuestionState.question_answers_error !== '' && (
                                <Alert className='error' severity="error">{selectedQuestionState.question_answers_error}</Alert>
                            )}
                        </div>
                        <div className='d-flex grid-justify-xs-flex-end '>
                            <Button onPress={saveQestion} className='mr-3'>{'Добавить вопрос'}</Button>
                            <Button onPress={cancelQestion}>{'Отмена'}</Button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const {
        course,
        course_loading,
        course_error,
        create_course_loading,
        create_course_error,
        update_course_loading,
        update_course_error,
        delete_course_loading,
        delete_course_error,

        lesson_test_editing_status,
        selected_lesson,
        selected_question,

        lesson_editing_status
    } = state.course_constructor;

    return {
        jwt, user,
        course,
        course_loading,
        course_error,
        create_course_loading,
        create_course_error,
        update_course_loading,
        update_course_error,
        delete_course_loading,
        delete_course_error,

        lesson_test_editing_status,
        selected_lesson,
        selected_question,

        lesson_editing_status
    };
}

const connectedCourseLessonsTestRedactor = connect(mapStateToProps)(CourseLessonsTestRedactor);

export { connectedCourseLessonsTestRedactor as CourseLessonsTestRedactor }

