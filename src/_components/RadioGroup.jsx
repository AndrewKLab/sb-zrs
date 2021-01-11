
import React from "react";

export const RadioGroup = ({ name, selectedValue, onChange, children, ...rest }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    const [checked, setChecked] = useState(null);

    function getChildContext() {
        return {
            radioGroup: {
                name, selectedValue, onChange
            }
        }
    }

    return <div role="radiogroup" {...rest}>{children}</div>;

};
