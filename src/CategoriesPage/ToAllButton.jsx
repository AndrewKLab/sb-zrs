import React from "react";
import { Link } from 'react-router-dom';
import { Button } from '../_components';

export const ToAllButton = ({ children, className }) => {
    let styleClass = className == undefined ? '' : ' ' + className;

    return (
        <div className={'d-flex grid-justify-xs-flex-end mt-3'+styleClass}>
            <Link to={"/courses/main"}>
                <Button variant="outlined" color="primary">{children}</Button>
            </Link>
        </div>
    );
};



