import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';

 const TextEditor = ({currentTheme, value, handleChange, setFieldValue}) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            handleChange()
            setFieldValue("lesson_text", editorRef.current.getContent())
            console.log(editorRef.current.getContent(), value);
        }
    };
    return (
        <div>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={value === '' ? 'Введите текст урока.' : value}
                id="lesson_text"
                textareaName='lesson_text'
                onEditorChange={log}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                        'table emoticons template paste help'
                      ],
                    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
                }}
            />
            <button onClick={log}>Log editor content</button>
        </div>
    );
}
function mapStateToProps(state) {
    const { currentTheme } = state.style;
    return {
        currentTheme,
    };
}


const conectedTextEditor = connect(mapStateToProps)(TextEditor);
export{conectedTextEditor as TextEditor}