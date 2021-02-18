import React from "react";

export const TableHeader = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <tr className={`row${styleClass}`}>
            {children}
        </tr>
    );
};