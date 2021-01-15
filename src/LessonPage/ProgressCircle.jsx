import React from 'react'
import DoneIcon from '@material-ui/icons/Done'

export const ProgressCircle = ({ status, number }) => {
    switch (status) {
        case null:
            return <div className={'step-circle'}>{number}</div>;
        case 'inprocess':
            return <div className={'step-circle step-circle-inprocess'}>{number}</div>;
        case 'finished':
            return <div className={'step-circle step-circle-done'}><DoneIcon/></div>;
        default:
            return null;
    }
}


