import React from "react";
import MaterialTable from "material-table";
//import { Button } from "@material-ui/core";

function Tabla(props) {
    //const [state, setState] = React.useState(data);  //ya no uso el state de material
    //ahora usamos props
    return (      
      <MaterialTable
        //title={props.titulo}
        //title=""
        //columns={state.columns}
        //data={state.data}

        title=""
        columns={props.tutores.columns}
        data={props.tutores.data}
       
      />
    );
  }
export default Tabla;