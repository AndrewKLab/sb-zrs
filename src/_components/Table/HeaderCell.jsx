import React from "react";

export const HeaderCell = ({ children, alt, src, className, rowSpan }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <th className={`${styleClass}`} rowSpan={rowSpan}> 
            {children}
        </th>
    );
};