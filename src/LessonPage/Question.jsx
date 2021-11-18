import React, { useState } from 'react'
import { Typography , Checkbox, FormControlLabel, Radio } from '../_components'
import { Answer } from '.';

export const Question = ({ question, register }) => {
    const [selected, setSelected] = useState('');
    return (
        <div className='d-flex grid-direction-xs-column mb-3'>
            <Typography component="h5" variant="h5" className='mb-2' >{question.question}</Typography>
            {question.answers.map((answer, index) =>
                <Answer question_type={question.question_type} answer={answer} key={index} register={register} selected={selected} setSelected={setSelected} />
            )}
        </div>
    )
}


