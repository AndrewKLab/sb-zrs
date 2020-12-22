
import React from "react";

export const Form = ({ children, className }) => {
    return (
            <form className={className}>
                {children}
            </form>
    );
};
