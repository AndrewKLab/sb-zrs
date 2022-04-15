import React from 'react'
import { Typography } from '../_components'
import { Answer } from '.';

export const Question = ({ question, values, handleChange, setFieldValue }) => {
    return (
        <div className='d-flex grid-direction-xs-column mb-3'>
            <Typography component="h5" variant="h5" className='mb-2' >{question.question}</Typography>
            {question.answers.map((answer, index) =>
                <Answer question_type={question.question_type} answer={answer} key={index} values={values} handleChange={handleChange} setFieldValue={setFieldValue} />
            )}
        </div>
    )
}


