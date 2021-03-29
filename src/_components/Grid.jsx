import React from "react";

export const Grid = ({ children, container, item, xs, sm, spacing, className, style, justify }) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    let gridContainer = container ? 'grid-container' : ''
    let gridItem = item ? ' grid-item' : ''
    let gridXs = xs ? ' grid-xs-'+xs : ''
    let gridSm = sm ? ' grid-sm-'+sm : ''
    let gridSpacing = spacing ? ' grid-spacing-xs-'+spacing : ''
    let gridJustify = justify ? ' grid-justify-xs-'+justify : ''

    return (
        <div className={gridContainer+gridItem+gridXs+gridSm+gridSpacing+styleClass+gridJustify} style={style}>
            {children}
        </div>
    );
};