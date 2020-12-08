import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import yellow from "@material-ui/core/colors/yellow";

const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: green[500],
        },
    },
});
export default mainTheme;