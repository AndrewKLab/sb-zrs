import React, { useRef } from "react";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import config from 'config';

export const Avatar = ({ children, alt, src, edit, editIcon, editAction, className }) => {
    const upload_avatar_form = useRef(null);
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`avatar${styleClass}`}>
            {children}
            {src && <img alt={alt} src={`${config.url}${src}`} className="avatar-img" />}
            {edit && <form ref={upload_avatar_form} id="upload_avatar_form">
                <label className="avatar-edit" for="upload_avatar">
                    {editIcon ? editIcon : <AddAPhotoIcon fontSize="large" />}
                </label>
                <input id="upload_avatar" className='d-none' type={'file'} name="avatar" onChange={(event) => editAction(event, upload_avatar_form.current)} />
            </form>}
        </div>
    );
};