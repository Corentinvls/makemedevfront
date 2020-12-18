import React from 'react';
import clsx from 'clsx';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useHistory} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {logOut} from "../../store/actions";
import AppBarComponent from "./AppBarComponent";
import MenuLogged from "./MenuLogged";
import MenuLogOut from "./MenuLogOut";
import AvatarWithPseudo from "../../utils/components/AvatarWithPseudo";

const drawerWidth = 240;

function MenuDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [displaySignUp, setDisplaySignUp] = React.useState(false);
    const [displaySignIn, setDisplaySignIn] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        if (!anchorEl) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleSignIn = () => {
        setDisplaySignIn(!displaySignIn);
        setAnchorEl(null);
    }
    const handleSignUp = () => {
        setDisplaySignUp(!displaySignUp);
        setAnchorEl(null);
    };

    const toggleSignDialogs = () => {
        setDisplaySignUp(!displaySignUp);
        setDisplaySignIn(!displaySignIn);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {props.isLog ?
                [<MenuItem key={"profile"} onClick={handleMenuClose}>Profile</MenuItem>,
                    <MenuItem key={"account"} onClick={handleMenuClose}>My account</MenuItem>
                ]
                :
                [<MenuItem key={"log"} onClick={handleSignIn}>Log in</MenuItem>,
                    <MenuItem key={"Sign"} onClick={handleSignUp}>Sign Up</MenuItem>
                ]

            }

        </Menu>
    );

    function keyPress(event) {
        const search = event.target.value
        let refactorSearch = []
        search.split("").map((character) => character === "?" ? refactorSearch.push("3F") : refactorSearch.push(character))
        if (event.keyCode === 13) {
            let finalSearch = refactorSearch.length === 0 ? " " : refactorSearch.join("")
            history.push("/results/" + finalSearch)
        }
    }


    function showIfLoginOrNot() {
        if (props.token.length > 0) {
            return <MenuLogged onClick={() => history.push("/profile")}
                               onClick1={() => history.push("/create")}
                               onClick2={() => {
                                     props.logOut()
                                     history.push("/")
                                 }}/>
        } else {
            return <MenuLogOut
                onClick={handleProfileMenuOpen}
                renderMenu={renderMenu}/>
        }
    }

    function showUserIfLoginOrNot() {
        if (props.token.length > 0) {
            return <AvatarWithPseudo pseudo={props.user.pseudo}
                                     avatar={props.user.avatar}
                                     marginLeft={10}/>;
        } else {
            return <AvatarWithPseudo pseudo={"Guest"}
                                     avatar={"Guest"}
                                     marginLeft={10}/>
        }

    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBarComponent classes={classes}
                             open={open}
                             onClick={handleDrawerOpen}
                             onKeyDown={keyPress}
                             open1={displaySignUp}
                             onClose={handleSignUp}
                             toggleSignDialogs={toggleSignDialogs}
                             open2={displaySignIn}
                             onClose1={handleSignIn}/>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} style={{justifyContent: "space-between"}}>
                    {showUserIfLoginOrNot()}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {showIfLoginOrNot()}
                </List>
            </Drawer>
            <div className={classes.content}>
                {props.content()}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        paddingTop: 64,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        flexGrow: 1,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: "100%"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    iconDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
}));

const mapStateToProps = state => {
    return {
        user: state.user,
        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)
