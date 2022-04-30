import React from "react";
import style from "./AdminCardView.module.css";

export default function AdminCardView() {
  return (
    <div className={style.principalContainer}>
      <div className={style.titleAndAddBtn}>
        <h4>Actividades</h4>
        <button
          onClick={() => document.getElementById("createDialog").showModal()}
          className={style.addBtn}
        >
          Agregar
        </button>
      </div>
      <div className={style.cardLayout}>
        <table className={style.tableAdminView}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className={style.thDescription}>Description</th>
              <th>Price</th>
              <th>Video</th>
              <th>Image</th>
              <th>Days</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>Zumba</td>
              <td className={style.tdDescription}>
                El éxito de estas clases reside en que no es necesario saber
                bailar para poder participar. A través de la combinación de
                pasos sencillos y generalmente relacionados con los ritmos
                latinos y el aerobic, se crean coreografías fáciles y divertidas
                con las que conseguimos quemar calorías pasando un rato
                divertido. En el caso del Zumba, se incluyen ejercicios de
                fitness durante las coreografías, permitiendo que las clases
                sean un poco más intensas. Ayuda a educir el peso, mejorar el
                equilibrio y reducir el estrés.
              </td>
              <td>200</td>
              <td className={style.tdImageAndVideo}>
                "https://time2feat.com/wp-content/uploads/2019/11/mejores-clases-colectivas-gimnasio-en-grupo-ejercicio-entrenamiento-efectivas-zumba.jpg.webp",
              </td>
              <td className={style.tdImageAndVideo}>
                "https://youtu.be/vYXRZNVVFVA"
              </td>
              <td>
                <div className={style.listOfItems}>
                  <ul>
                    <li>Lunes</li>
                    <li>Miercoles</li>
                    <li>Viernes</li>
                  </ul>
                </div>
              </td>
              <td>
                <div className={style.listOfItems}>
                  <ul>
                    <li>14-16</li>
                    <li>18-20</li>
                  </ul>
                </div>
              </td>
              <td>
                <button
                  onClick={() =>
                    document.getElementById("editDialog").showModal()
                  }
                  className={style.editBtn}
                >
                  Edit
                </button>
              </td>
            </tr>{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
}
