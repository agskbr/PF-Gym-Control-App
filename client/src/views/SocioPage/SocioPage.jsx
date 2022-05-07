import style from "./SocioPage.module.css";
import MyActivities from "./components/MyActivities/MyActivities";
import SideBar from "./components/Sidebar/SideBar";

export default function SocioPage() {
 
  return (
    <div className={style.principalContainer}>
      <SideBar/>
     
        <MyActivities />
      
      
      
    </div>
  );
}
