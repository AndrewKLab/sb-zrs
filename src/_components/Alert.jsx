import React from "react";

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

export const Alert = ({ children, severity, className }) => {
    let styleClass;
    var alertType;
    var alertIcon;
    if (className) {
        styleClass = className
    } else {
        styleClass = ''
    }

    switch (severity) {
        case 'error':
            alertType = ' alert-error '
            alertIcon = <ErrorOutlineIcon />
            break;
        case 'warning':
            alertType = ' alert-warning '
            alertIcon = <ReportProblemOutlinedIcon />
            break;
        case 'info':
            alertType = ' alert-info '
            alertIcon = <InfoOutlinedIcon />
            break;
        case 'success':
            alertType = ' alert-success '
            alertIcon = <CheckCircleOutlineOutlinedIcon />
            break;
        default:
            alertType = ' alert-info '
            alertIcon = <InfoOutlinedIcon />
            break;
    }

    return (
        <div className={'alert' + alertType + styleClass} role="alert">
            <div className='alert-icon'>{alertIcon}</div>
            <div className="alert-message">
                {children}
            </div>
        </div>
    );
};
