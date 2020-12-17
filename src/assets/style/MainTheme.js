import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],

        },
        secondary: {
            main: green[500],
        },
    },
});
export default mainTheme;