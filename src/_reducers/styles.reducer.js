import { stylesConstants } from '../_constants';

const currentTheme = localStorage.getItem('theme') || 'light'


const initialState = {
    currentTheme: currentTheme,
      themes: {
        light: {
          'primary-ligt-color': '#4dabf5',
          'primary-main-color': '#2196f3',
          'primary-dark-color': '#1769aa'
        },
        dark: {
          'primary-ligt-color': '#ffcd38',
          'primary-main-color': '#ffc107',
          'primary-dark-color': '#b28704'
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