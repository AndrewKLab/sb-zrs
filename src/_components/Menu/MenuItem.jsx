
import React, { useState } from "react";

export const MenuItem = ({ children, className}) => {
    let styleClass = className !== undefined ? ' '+className : '';

    return (
        <div className={'menu-item' + styleClass} >
            {children}
        </div>
    );
};
