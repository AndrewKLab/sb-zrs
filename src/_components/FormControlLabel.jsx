
import React from "react";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const FormControlLabel = ({ children, control, label, onChange, className }) => {
    let styleClass;
    let chekedIcon;
    let checkboxName;

    if (className) {
        styleClass = className
    } else {
        styleClass = ''
    }


    return (
            <div className={"form-contol-label" + styleClass}>
                {control}
                <label>{label}</label>
            </div>
    );
};
