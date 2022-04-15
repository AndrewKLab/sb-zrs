import React, { useEffect } from "react";

export const _Dropdown = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`dropdown${styleClass}`}>
            {children}
        </div>
    );
};