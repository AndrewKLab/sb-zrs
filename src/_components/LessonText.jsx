import React from 'react';


export const LessonText = ({ text }) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
}
