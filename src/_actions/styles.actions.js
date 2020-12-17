import { stylesConstants } from '../_constants';

export const stylesActions = {
    setTheme,
};

function setTheme(theme) { return { type: stylesConstants.SET_THEME, theme } }