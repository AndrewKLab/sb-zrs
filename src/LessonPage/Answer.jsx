import React, {useState} from 'react'
import {TextInput, Checkbox, FormControlLabel, Radio } from '../_components'

export const Answer = ({ answer, key, questionType, selected, setSelected, children }) => {
    const [checked, setChecked] = useState('');
    var answer;

    switch (questionType) {
        case 'checkbox':
            answer = (
                <FormControlLabel
                    className='w-max'
                    control={<Checkbox checked={checked} name='remember' onChange={() => setChecked(!checked)} />}
                    label={answer.answer}
                />
            )
            break;
        case 'radio':
            answer = (
                <FormControlLabel
                className='w-max'
                    control={<Radio
                        value={answer.answer}
                        selected={selected}
                        name='remember'
                        onChange={setSelected} />}
                    label={answer.answer}
                />
            )
            break;
        case 'text':
            answer = <TextInput className={'w-100'} label="Ответ"/>
            break;

        default:
            answer = <div key={key}>{answer.answer}</div>
            break;
    }
    return answer;
}


