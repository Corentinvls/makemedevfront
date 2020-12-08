import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";

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