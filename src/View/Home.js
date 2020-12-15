import logo from "../logo.svg";
import React from "react";
import Button from "@material-ui/core/Button";
import SignUp from "../components/register/SignUp";
import SignIn from "../components/register/SignIn";
import HeaderHome from "../components/home/HeaderHome";
import BodyHome from "../components/home/BodyHome";

export default function Home() {
    const [displaySignUp, setDisplaySignUp] = React.useState(false);
    const [displaySignIn, setDisplaySignIn] = React.useState(false);
    const toggleSignDialogs = () => {
        setDisplaySignUp(!displaySignUp);
        setDisplaySignIn(!displaySignIn);
    }
    return (
        <><header className="App-header">
            <HeaderHome />
            <Button variant="contained" color="primary" size={"large"} onClick={()=>setDisplaySignUp(!displaySignUp)}>
                Join us
            </Button>
            <SignUp open={displaySignUp} onClose={()=>setDisplaySignUp(!displaySignUp)}
                    toggleSignDialogs={toggleSignDialogs}/>
            <SignIn open={displaySignIn} onClose={()=>setDisplaySignIn(!displaySignIn)}
                    toggleSignDialogs={toggleSignDialogs}/>
        </header>
        <section>
            <BodyHome>
            </BodyHome>
        </section>
        </>


    )
}
