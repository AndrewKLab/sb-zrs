import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export const ButtonLoading = ({className}) => {
  let styleClass = className == undefined ? '' : ' ' + className;
  return (
      <div className="button-loading">
      <CircularProgress size={20} />
      </div>
  );
};