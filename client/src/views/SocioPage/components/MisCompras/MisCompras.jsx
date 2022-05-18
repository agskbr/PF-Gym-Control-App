import React, { useEffect } from "react";
import s from "./MisCompras.module.css";
import { HiDocumentSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  completeOrder,
  cancelOrder2,
} from "../../../../store/actions/actions-orders";
import { getUserById } from "../../../../store/actions/actions-user";
import OrderDetail from "./OrderDetail/OrderDetail";

export default function MisCompras() {
  // window.location.reload();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.login.user); //saco el uid el usuario
  //const uid = "dd829b3f14d94959982221a7ba36"
  //console.log("uid", uid)
  const { id } = useSelector((state) => state.users.user);
  //console.log("usuario", id)

  const allOrders = useSelector((state) => state.pgym.orders);
  const statusOrder = useSelector((state) => state.pgym.orderStatus);
  const {orderlines} = useSelector((state) => state.pgym.orders)
  console.log("orderlinesss", orderlines)

  console.log("oredn2", allOrders)
  
  const completeStatusOrder = () => {
    console.log("entre al put");
    if (statusOrder === "approved") {
      const allOrdersFiltered = allOrders.filter(
        (el) => el.state === "Created"
      );
      if (allOrdersFiltered.length !== 0) {
        completeOrder(allOrdersFiltered[0].id);
      }
      // console.log("entre al if ");
      // console.log(allOrdersFiltered);
    } else {
      const allOrdersFiltered = allOrders.filter(
        (el) => el.state === "Created"
      );
      if (allOrdersFiltered.length !== 0) {
        cancelOrder2(allOrdersFiltered[0].id);
      }
    }
  };
  const newAllOrders = allOrders.filter(
    (el) => el.state === "Complete"
  );


  useEffect(() => {
    dispatch(getUserById(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(getAllOrdersByUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    completeStatusOrder();
  }, []);

  return (
    <div className={s.comprasContainer}>
      <div className={s.comprasTitle}>
        {/* <h4 className={s.comprasNameSeccion}></h4> */}
      </div>
      <div className={s.comprasCardLayout}>
        <table className={s.containerTable}>
          <thead className={s.encabezado}>
            <tr className={s.tableRow}>
              <th className={s.columnas}> Orden de compra N°</th>
              <th className={s.columnas}> Actividad </th>
              <th className={s.columnas}> Fecha de compra</th>
              <th className={s.columnas}> Estado </th>
              <th className={s.columnas}> Total </th>
              {/* <th className={s.columnas}> Cantidad </th> */}
              {/* <th className={s.columnas}> Total </th> */}
              {/* <th className={s.columnas}>Descargar</th> */}
            </tr>
          </thead>
          <tbody>
            {newAllOrders?.map((orden) => (
              <tr key={orden.id}  className={s.tableRow}>
                <td className={s.filas}>{orden.id}</td>
                {orden.activities.map((e) => (
                  <td className={s.filasAct}>
                    {e.name}
                  </td>

                ))
              }
              

                <td className={s.filas}>{orden.updatedAt.slice(0, 10)}</td>
                <td className={s.filas}>{orden.state}</td>
                {/* {orden.activities.map((e) => (
                  // e.values((e))
          

                )) */}
              {/* } */}
                
                <td className={s.filas}> ${orden.totalPrice}</td>
                


                 {/* {orden.activities.map((e) => (
                  e.map((e)=> (
                    <td className={s.filasAct2}>
                    $ {e.quantity}
                   </td>
        

                  ))


                ))
              } */}

                {/* <td className={s.filas}>
                  <HiDocumentSearch
                    onClick={() => {
                      document.getElementById("orderDetailDialog").showModal();
                    }}
                  />

                  <OrderDetail
                    orderId={orden.id}
                    totalPrice={orden.totalPrice}
                  />
                </td> */}
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
