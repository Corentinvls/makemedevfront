import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import DescriptionComponent from "../../utils/components/DescriptionComponent";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SearchTuto(props) {
    const classes = useStyles();
    const id = props.open ? 'simple-popover' : undefined;
    const combinationContent='An example of search request: `functionName(int, int){int, ?} "function to multiply" [tag, tag]`'
const content="  #### Function name\n" +
    "                    If you want to search by function name,\n" +
    "                    first step is to write it.\n" +
    "                    Function name is `always` at the beginning of a request.\n" +
    "                    >This name could be uncompleted, we search function with a name\n" +
    "                    >containing your searched name.\n" +
    "\n" +
    "                    Example:\n" +
    "\n" +
    "                    ```\n" +
    "                    accurate name       => sortMyArray\n" +
    "                    less precise name   => sortMy\n" +
    "                    ```\n" +
    "\n" +
    "                    #### Params\n" +
    "                    If you want to search by params,\n" +
    "                    first step is to write brackets `()`.\n" +
    "                    Into those brackets, write the type of params to search.\n" +
    "                    >The number of params is important, you can search function without params\n" +
    "                    >with single brackets.\n" +
    "                    >\n" +
    "                    >Moreover, if you want to search function without knowing all params type, replace\n" +
    "                    >the unknown ones by ?\n" +
    "\n" +
    "                    Examples:\n" +
    "                    ```\n" +
    "                    no params           => ()\n" +
    "                    one int             => (int)\n" +
    "                    2 int, 1 array      => (int, int, array)\n" +
    "                    1 int, 2 unknowns   => (int, ?, ?)\n" +
    "                    ```\n" +
    "\n" +
    "                    #### Returns\n" +
    "                    If you want to search by returns,\n" +
    "                    first step is to write braces `{}`.\n" +
    "                    Into those braces, write the type of returns to search.\n" +
    "                    >Refer to [Params](#Params) for details explanations on types.\n" +
    "\n" +
    "                    Examples:\n" +
    "                    ```\n" +
    "                    no returns      => {}\n" +
    "                    unknown         => {?}\n" +
    "                    one int or null => {int, null}\n" +
    "                    ```\n" +
    "\n" +
    "                    #### Description\n" +
    "                    If you want to search by description,\n" +
    "                    first step is to write double quote `\"\"`.\n" +
    "                    Then, write a complete or a part of the description.\n" +
    "\n" +
    "                    Example:\n" +
    "\n" +
    "                    ```\n" +
    "                    accurate description       => \"a function to sort array returning the new array or null if isn't of type array\"\n" +
    "                    less precise description   => \"function to sort\"\n" +
    "                    ```\n" +
    "\n" +
    "                    #### Tags\n" +
    "                    If you want to search by tags, first step is to write square brackets `[]`.\n" +
    "                    Into those square brackets, write all tags you want to search.\n" +
    "                    >We search all function with all your tags or more.\n" +
    "                    >Empty brackets mean you want a function without any tag\n" +
    "\n" +
    "                    Example:\n" +
    "\n" +
    "                    ```\n" +
    "                    1 tags => [sort]\n" +
    "                    2 tags => [sort, easy]\n" +
    "                    ```\n" +
    "\n" +
    "                    ### Combination\n" +
    "                    Each of those could be used to search function or not.\n" +
    "                    You can use a combination of these to accurate your search.\n" +
    "\n" +
    "                    Find below an example of search request:\n" +
    "\n" +
    "                    `functionName(int, int){int, ?} \"function to multiply\" [tag, tag]`"
    return (<Popover
                id={id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
            <Grid container justify="center"
                  alignItems="center"
                  textAlign="center"spacing={3}>
                <Grid item xs={12}>
                    <h3>Which are criteria to search function</h3>
                    <p>  You can search function by: name, params type, returns type, description, tags</p>
                    <p>{combinationContent}</p>
                </Grid>

            </Grid>
            </Popover>

    );
}
