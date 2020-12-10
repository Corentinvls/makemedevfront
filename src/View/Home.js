import React from "react";
import Button from "@material-ui/core/Button";
import SignUp from "../components/register/SignUp";
import SignIn from "../components/register/SignIn";
import MediaCard from "../components/cards/cardsHome/CardMedia";

export default function Home() {
    const [displaySignUp, setDisplaySignUp] = React.useState(false);
    const [displaySignIn, setDisplaySignIn] = React.useState(false);
    const toggleSignDialogs = () => {
        setDisplaySignUp(!displaySignUp);
        setDisplaySignIn(!displaySignIn);
    }
    const bigTitle = "We <3 people who share code"
    return (
        <><header className="App-header">
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
        <section>
            <MediaCard title={"TEST"} buttonLabel={"buttonTest"} image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Ft%2Fmaterial-design-background-mountain-landscape-vector-blue-illustration-92941969.jpg&f=1&nofb=1"}>
                test
            </MediaCard>
        </section>
        </>
        

    )
}