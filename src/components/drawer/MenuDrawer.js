import React from 'react';
import clsx from 'clsx';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link, useHistory} from "react-router-dom";
import {ReactComponent as BrandName} from "../../assets/image/title.svg";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SignUp from "../register/SignUp";
import SignIn from "../register/SignIn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";
import {logOut} from "../../store/actions";

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
        if (event.keyCode === 13) {
            console.log(event)
            history.push("/results/" + event.target.value)
        }
    }


    function showIfLoginOrNot() {
        if (props.token.length > 0) {
            console.log(props)
            return <>
                <ListItem button onClick={() => history.push("/profile")}>
                    <ListItemIcon>
                        <AccountCircle/>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={() => history.push("/create")}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Post a function
                    </ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                    props.logOut()
                    history.push("/")
                    // window.location.reload(false)
                }}>
                    <ListItemIcon>
                        <ExitToAppIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Log out
                    </ListItemText>
                </ListItem>
            </>
        } else {
            return <>
                <ListItem button onClick={handleProfileMenuOpen}>
                    <ListItemIcon>
                        <AccountCircle/>
                    </ListItemIcon>
                    <ListItemText>
                        SignIn or SignUp
                    </ListItemText>
                    {renderMenu}
                </ListItem></>
        }
    }

    function showUserIfLoginOrNot() {
        if (props.token.length > 0) {
            return <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Avatar alt={props.user.pseudo} src={props.user.avatar}/>
                <div style={{marginLeft: 10}}>{props.user.pseudo}</div>
            </div>;
        } else {
            return <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Avatar alt="Guest"/>
                <div style={{marginLeft: 10}}>Guest</div>
            </div>;
        }

    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link style={{textDecoration: 'none'}} to={"/"}>
                        <BrandName className={classes.iconDesktop}/>
                    </Link>
                    <div className={classes.search}>
                        <IconButton type={"submit"} className={classes.searchIcon} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onKeyDown={keyPress}
                        />
                    </div>
                    <Link to="/about">About</Link>
                    <SignUp open={displaySignUp} onClose={handleSignUp}
                            toggleSignDialogs={toggleSignDialogs}/>
                    <SignIn open={displaySignIn} onClose={handleSignIn}
                            toggleSignDialogs={toggleSignDialogs}/>
                </Toolbar>
            </AppBar>
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
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
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
