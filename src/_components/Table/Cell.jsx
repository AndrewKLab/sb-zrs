import React from "react";

export const Cell = ({ children, alt, src, className, rowSpan, colSpan }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <td className={`${styleClass}`} rowSpan={rowSpan} colSpan={colSpan}>
            {children}
        </td>
    );
};