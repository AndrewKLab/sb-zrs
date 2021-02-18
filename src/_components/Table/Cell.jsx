import React from "react";

export const Cell = ({ children, alt, src, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <td className={`${styleClass}`}>
            {children}
        </td>
    );
};