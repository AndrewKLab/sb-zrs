import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loading = ({className}) => {
  let styleClass = className == undefined ? '' : ' ' + className;
  return (
    <div className={`loading${styleClass}`}>
      <CircularProgress />
    </div >
  );
};