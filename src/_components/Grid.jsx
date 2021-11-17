import React from "react";

export const Grid = ({ children, container, item,sm, md, xs, lg, spacing, className, style, justify }) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    let gridContainer = container ? 'grid-container' : '';
    let gridItem = item ? ' grid-item' : '';

    let gridLg = lg ? ' grid-lg-'+lg : '';
    let gridXs = xs ? ' grid-xs-'+xs : '';
    let gridMd = md ? ' grid-md-'+md : '';
    let gridSm = sm ? ' grid-sm-'+sm : '';

    let gridSpacing = spacing ? ' grid-spacing-xs-'+spacing : ''
    let gridJustify = justify ? ' grid-justify-xs-'+justify : ''

    return (
        <div className={gridContainer+gridItem+gridSm+gridMd+gridXs+gridLg+gridSpacing+styleClass+gridJustify} style={style}>
            {children}
        </div>
    );
};