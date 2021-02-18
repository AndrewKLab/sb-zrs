import React from "react";

export const Row = ({ children, alt, src, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <tr className={`row${styleClass}`}>
            {children}
        </tr>
    );
};