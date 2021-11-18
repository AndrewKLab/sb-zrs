import React from "react"
import ClampLines from "react-clamp-lines"
import { Typography } from ".."
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const Notification = ({ title, body, closeNotification }) => {
    return (
        <div className="notification-content">
            <div className="notification-title">
                <Typography variant={'strong'} component={'strong'} className="mb-0">{title}</Typography>
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={closeNotification}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            </div>
            <div className="notification-body">
                <ClampLines
                    text={body}
                    id="notify-message-text"
                    lines={3}
                    ellipsis="..."
                    buttons={false}
                    innerElement="p"
                />
                {/* <Typography variant={'body'} component={'body'} className="mb-0">{}</Typography> */}
            </div>
        </div>
    )
}