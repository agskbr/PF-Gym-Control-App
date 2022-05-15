import "./style.css"
import Hero from "../Hero/hero";
import Nav from "../Nav/nav";
import ChatBot from "react-simple-chatbot";


export default function Home() {
    return (
        <div className="container">
            <Nav />
            <div className="hero-container">
                <Hero />
            </div>
           

        </div>
    )
}

