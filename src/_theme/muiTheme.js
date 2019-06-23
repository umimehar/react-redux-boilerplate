// in src/theme/muiTheme.js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#235fa9',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E84C9B',
      // dark: will be calculated from palette.secondary.main,
    },
    // error: will use the default color
  },
});

export default theme;