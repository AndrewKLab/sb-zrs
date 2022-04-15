import React from "react";

export const Table = ({ children, className, header, sm }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <table className={`table${sm ? ' table-sm' : ''}${styleClass}`}>
            <thead>
                {header}
            </thead>
            <tbody>
                {children}
            </tbody>
        </table >
    );
};