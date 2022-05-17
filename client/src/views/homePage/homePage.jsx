import style from "./homePage.module.css";
import Home from "../../components/Home/home";
import AboutHome from "../../components/AboutHome/AboutHome";
import Clases from "../../components/Clases/Clases";
import Review from "../../components/Review/Review";
import NewClases from "../../components/NewClases/NewClases";
import ChatBot from "react-simple-chatbot";
import PowerChat from "../../components/ChatBot/ChatBot";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDescuentos } from "../../store/actions/actions-descuentos";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDescuentos());
  }, [dispatch]);
  return (
    <div className={style.homePage}>
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <AboutHome />
      </div>
      <div id="clases">
        <NewClases />
      </div>
      <div id="section-testimonials">
        <Review />
      </div>
      <div>{/*  <PowerChat/> */}</div>
      <div id="footer">
        <Footer />
      </div>

      



    </div>
    
  );
}
