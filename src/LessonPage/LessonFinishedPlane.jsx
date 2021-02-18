import React from 'react'
import Moment from 'moment';
import 'moment/locale/ru';
import { Typography } from '../_components'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const LessonFinishedPlane = ({ assessment, finish_time }) => {
    return (
        <div>
            <div className='done-area-title'>
                <Typography variant="h5" component="h5">Урок пройден</Typography>
                <CheckCircleOutlineIcon className='done-area-title-icon' fontSize="large" />
            </div>
            {assessment !== null && <Typography variant="body" component="body">Оценка: {assessment}</Typography>}
            <Typography variant="body" component="body">Дата и время прохождения: {Moment(finish_time).locale('ru').format('Do MMMM YYYY, hh:mm:ss')}</Typography>
        </div>
    )
}


