
import React from "react";

export const Typography = ({ align, children, variant, component, className }) => {
    var styleClass;
    var typographyComponent;
    
    if(className){
        styleClass = ' '+className
    } else {
        styleClass = ''
    }

    switch (component) {
        case 'h1':
            typographyComponent = <h1 className={variant + styleClass}>{children}</h1>
            break;

        case 'h2':
            typographyComponent = <h2 className={variant + styleClass}>{children}</h2>
            break;

        case 'h3':
            typographyComponent = <h3 className={variant + styleClass}>{children}</h3>
            break;

        case 'h4':
            typographyComponent = <h4 className={variant + styleClass}>{children}</h4>
            break;

        case 'h5':
            typographyComponent = <h5 className={variant + styleClass}>{children}</h5>
            break;

        case 'h6':
            typographyComponent = <h6 className={variant + styleClass}>{children}</h6>
            break;

        case 'body':
            typographyComponent = <span className={variant + styleClass}>{children}</span>
            break;

        case 'subtitle':
            typographyComponent = <h2 className={variant + styleClass}>{children}</h2>
            break;

        default:
            typographyComponent = <span className={variant + styleClass}>{children}</span>
            break;
    }

    return typographyComponent
};
