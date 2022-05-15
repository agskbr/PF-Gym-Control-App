import style from './homePage.module.css'
import Home from '../../components/Home/home'
import AboutHome from '../../components/AboutHome/AboutHome'
import Clases from '../../components/Clases/Clases'
import Review from '../../components/Review/Review'
import NewClases from '../../components/NewClases/NewClases'
import ChatBot from 'react-simple-chatbot'
import PowerChat from '../../components/ChatBot/ChatBot'

export default function HomePage() {
 return (
            <div className={style.homePage}>
                <div id='home'>
                    <Home />
                </div>
                <div id='about'>
                    <AboutHome />
                </div>
                <div id='clases'>
                    <NewClases />
                </div>
                <div id='section-testimonials'>
                    <Review/>
                </div>
                <div>
                   {/*  <PowerChat/> */}
                </div>
            </div>
        )

}



