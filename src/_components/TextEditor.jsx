import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const TextEditor = ({ className, height, value, onChange, placeholder, currentTheme }) => {
  let styleClass = className == undefined ? '' : ' ' + className;
  const TextEditorRef = useRef(null);

  return (
    <div className={styleClass}>
      <Editor
        onInit={(evt, editor) => TextEditorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          selector: 'textarea',
          placeholder: placeholder,
          height: height,
          menubar: false,
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
          plugins: [
            'advlist autolink lists link image charmap preview emoticons',
            'searchreplace visualblocks code',
            'insertdatetime media advtable table paste code help wordcount'
          ],
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | preview | image media table link codesample | code',
          toolbar_mode: 'sliding',
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color:${currentTheme === 'dark' ? '#fff' : 'rgb(34, 62, 84)'}; }`,
          language: 'ru'
        }}
      />
    </div>
  );
}
