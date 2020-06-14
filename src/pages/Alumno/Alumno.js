import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Alumno/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import AgendarCita from "./AgendarCita.js";
import MisCitas from "./MisCitas.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue } from "../../Sesion/Sesion.js";

const Alumno = (props) => {
  console.log("Alumno", props.history.location.pathname);
  const [{ usuario, auth }, dispatch] = useUserValue();
  if (!auth) {
    props.history.push("/");
  } else {
    const move_to = usuario.usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.DESCRIPCION.toLowerCase();
    console.log("Ruta", move_to);

    if (move_to !== "alumno") {
      props.history.push("./" + move_to);
    }
  }

  return (
    <div>
      <Route
        exact
        path={"/alumno/"}
        component={() => (
          <>
            <SaltoDeLinea N={3} />
            <MisCitas />
          </>
        )}
      />
      <BarraNavegacion>
        <Route exact path={"/alumno/perfil"} component={Perfil} />
        <Route exact path={"/alumno/agendarCita"} component={AgendarCita} />
        <Route exact path={"/alumno/misCitas"} component={MisCitas} />
      </BarraNavegacion>
    </div>
  );
};
export default Alumno;
