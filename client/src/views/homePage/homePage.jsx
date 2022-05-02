import style from './homePage.module.css'
import Home from '../../components/Home/home'
import AboutHome from '../../components/AboutHome/AboutHome'
import Clases from '../../components/Clases/Clases'


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
                    <Clases />
                </div>
            </div>
        )

}



