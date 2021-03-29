import { stylesConstants } from '../_constants';

const currentTheme = localStorage.getItem('theme') || 'light'


const initialState = {
    currentTheme: currentTheme,
      themes: {
        light: {
          'primary-light-color': '77, 171, 245',
          'primary-main-color': '33, 150, 243',
          'primary-dark-color': '23, 105, 105',
          'background-color': '255, 255, 255',

          'text-light': '255, 255, 255',
          'text-dark': '66, 66, 66',

          'alert-danger-background-color': '253, 236, 234',
          'alert-danger-text-color': '97, 26, 21',
          'alert-danger-icon-color': '244, 67, 54',

          'background-color-light' : '245, 245, 245'
        },
        dark: {
          'primary-light-color': '255, 205, 56',
          'primary-main-color': '255, 193, 7',
          'primary-dark-color': '178, 135, 4',
          'background-color': '48, 48, 48',

          'text-light': '66, 66, 66',
          'text-dark': '255, 255, 255',
          
          'alert-danger-background-color': '244, 67, 54',
          'alert-danger-text-color': '255, 255, 255',
          'alert-danger-icon-color': '255, 255, 255',

          'background-color-light' : '100, 100, 100'
        }
      }
};


export function style(state = initialState, action) {
  switch (action.type) {
    case stylesConstants.SET_THEME:
      return {
        currentTheme: action.theme.currentTheme,
        themes: action.theme.themes,
      };
    default:
      return state
  }
}