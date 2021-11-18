
import React from "react";

export const Typography = ({ align, children, variant, component, className }) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    let styleVariant = variant == undefined ?  '' : variant;
    var typographyComponent;

    switch (component) {
        case 'h1':
            typographyComponent = <h1 className={styleVariant + styleClass}>{children}</h1>
            break;

        case 'h2':
            typographyComponent = <h2 className={styleVariant + styleClass}>{children}</h2>
            break;

        case 'h3':
            typographyComponent = <h3 className={styleVariant + styleClass}>{children}</h3>
            break;

        case 'h4':
            typographyComponent = <h4 className={styleVariant + styleClass}>{children}</h4>
            break;

        case 'h5':
            typographyComponent = <h5 className={styleVariant + styleClass}>{children}</h5>
            break;

        case 'h6':
            typographyComponent = <h6 className={styleVariant + styleClass}>{children}</h6>
            break;

        case 'body':
            typographyComponent = <p className={styleVariant + styleClass}>{children}</p>
            break;

        case 'subtitle':
            typographyComponent = <h2 className={styleVariant + styleClass}>{children}</h2>
            break;
            
        case 'strong':
            typographyComponent = <strong className={styleVariant + styleClass}>{children}</strong>
            break;

        default:
            typographyComponent = <span className={styleVariant + styleClass}>{children}</span>
            break;
    }

    return typographyComponent
};
