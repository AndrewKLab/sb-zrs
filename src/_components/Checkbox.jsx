
import React from "react";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const Checkbox = ({ children, checked, name, onChange, className }) => {
    let styleClass;
    let chekedIcon;
    let checkboxName;

    if (className) {
        styleClass = className
    } else {
        styleClass = ''
    }

    switch (checked) {
        case true:
            chekedIcon = <CheckBoxIcon />
            break;
        case false:
            chekedIcon = <CheckBoxOutlineBlankIcon/>
            break;
        default:
            chekedIcon = <CheckBoxOutlineBlankIcon />
            break;
    }

    if (name) {
        checkboxName = name
    } else {
        checkboxName = ''
    }

    return (
            <div className="checkbox">
                <input type="checkbox" name={name} onChange={onChange}  />
                {chekedIcon}
            </div>
    );
};
