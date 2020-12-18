import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom";
import {ReactComponent as BrandName} from "../../assets/image/title.svg";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import SignUp from "../register/SignUp";
import SignIn from "../register/SignIn";
import React from "react";
import SearchTuto from "./SearchTuto";

export default function AppBarComponent(props) {
    const [anchorElSearch, setAnchorElSearch] = React.useState(null);
    const handleClickSearch = (event) => {
        setAnchorElSearch(event.currentTarget);
    };
    const handleCloseSearch = () => {
        setAnchorElSearch(null);
    };
    const openSearch = Boolean(anchorElSearch);

    return <AppBar
        position="fixed"
        className={clsx(props.classes.appBar, {
            [props.classes.appBarShift]: props.open,
        })}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.onClick}
                edge="start"
                className={clsx(props.classes.menuButton, {
                    [props.classes.hide]: props.open,
                })}
            >
                <MenuIcon/>
            </IconButton>
            <Link style={{textDecoration: "none"}} to={"/"}>
                <BrandName className={props.classes.iconDesktop}/>
            </Link>
            <div className={props.classes.search} >
                <IconButton type={"submit"} className={props.classes.searchIcon} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    onClick={(e)=>handleClickSearch(e)}
                    placeholder="Search…"
                    classes={{
                        root: props.classes.inputRoot,
                        input: props.classes.inputInput,
                    }}
                    inputProps={{"aria-label": "search"}}
                    onKeyDown={props.onKeyDown}

                />
                <SearchTuto open={openSearch} anchorEl={anchorElSearch} handleClose={handleCloseSearch}/>
            </div>
            <SignUp open={props.open1} onClose={props.onClose}
                    toggleSignDialogs={props.toggleSignDialogs}/>
            <SignIn open={props.open2} onClose={props.onClose1}
                    toggleSignDialogs={props.toggleSignDialogs}/>
        </Toolbar>
    </AppBar>;
}
