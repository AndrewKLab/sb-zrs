import React from "react";

export const Error404 = ({ className }) => {
    let styleClass = className !== undefined ? ' '+className : '';

    return (
            <div className={`error-404${styleClass}`}>
ошибка
            </div>
    );
};