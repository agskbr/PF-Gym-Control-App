import Hero from "../Hero/hero";
import Nav from "../Nav/nav";
import AboutHome from "../AboutHome/AboutHome";


export default function Home() {
    return (
        <div>
            <Nav />
            <Hero />
            <AboutHome/>
        </div>
    )
}