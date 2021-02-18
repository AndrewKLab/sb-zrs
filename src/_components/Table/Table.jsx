import React from "react";

export const Table = ({ children, className, header }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <table className={`table${styleClass}`}>
            <thead>
                {header}
            </thead>
            <tbody>
                {children}
            </tbody>
        </table >
    );
};