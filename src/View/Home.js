import logo from "../logo.svg";
import React from "react";
import Button from "@material-ui/core/Button";
import SignUp from "../components/register/SignUp";
import SignIn from "../components/register/SignIn";

export default function Home() {
    const [displaySignUp, setDisplaySignUp] = React.useState(false);
    const [displaySignIn, setDisplaySignIn] = React.useState(false);
    const toggleSignDialogs = () => {
        setDisplaySignUp(!displaySignUp);
        setDisplaySignIn(!displaySignIn);
    }
    const bigTitle = "We <3 people who share code"
    return (
        <header className="App-header">
            <h1>{bigTitle}</h1>
            <h3>We build for you a solution to share optimized code <br/>
                and connect with a community of passionate developers<br/>
                help them, and be help.<br/>
            </h3>
            <Button variant="contained" color="primary" size={"large"} onClick={()=>setDisplaySignUp(!displaySignUp)}>
               Join us
            </Button>
            <SignUp open={displaySignUp} onClose={()=>setDisplaySignUp(!displaySignUp)}
                    toggleSignDialogs={toggleSignDialogs}/>
            <SignIn open={displaySignIn} onClose={()=>setDisplaySignIn(!displaySignIn)}
                    toggleSignDialogs={toggleSignDialogs}/>
        </header>
        

    )
}