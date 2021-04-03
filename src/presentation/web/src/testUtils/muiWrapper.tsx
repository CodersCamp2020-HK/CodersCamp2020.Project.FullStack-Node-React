import React, { ReactElement } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../themes/theme';

export default (ui: ReactElement): ReactElement => {
  return <MuiThemeProvider theme={theme}>{ui}</MuiThemeProvider>;
}; 