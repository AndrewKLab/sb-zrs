import React from "react";

export const TableHeaderText = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <th className={`${styleClass}`}>
            {children}
        </th>
    );
};