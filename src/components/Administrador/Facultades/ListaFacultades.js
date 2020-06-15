import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, Grid } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaFacultad from "./TablaFacultad";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from "@material-ui/core/IconButton";


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class ListaFacultades extends React.Component {
  constructor() {
    super();
    this.state = {
        facultades: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        facultad:[{id:"1"}]
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);

  }
  async componentDidMount(){
    let arregloFac=await Controller.GET({servicio:"/api/facultad/"});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    
    console.log("arreglo: ",arregloFac);

    let arreglillo = [];
    for (let element of arregloFac.facultad){
      if (element.ID_PROGRAMA!==null){
        arreglillo.push({
          codigo:element.ID_PROGRAMA,
          nombre:element.NOMBRE,
          boton:<div> 
                <Grid item md={4}> 
                  <IconButton color="primary">
                      <EditRoundedIcon
                      color="secondary"
                      fontsize="large" />
                  </IconButton>
                  <IconButton color="primary">
                      <DeleteRoundedIcon
                      color="error"
                      fontsize="large" />
                  </IconButton> 
                </Grid>  
                      {/*<Button 
                          variant="outlined"
                          color="primary">
                          Ver Facultad
                      </Button>*/}
                </div>
          });  

      }
    }
    const data = {
        columns: [
          {
            title: "Código",
            field: "codigo",
          },
          {
            title: "Nombre",
            field: "nombre",
          },
          {
            title:"Acciones",
            field:"boton"
           }
        ],
        data: arreglillo
      };
      this.setState({facultades:data});
}


render(){
    return (
        <div>
            <Paper elevation={0} style={style.paper}>
                {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                <TablaFacultad facultades={this.state.facultades}  />
            </Paper>
        </div>
    );
}

}

export default ListaFacultades;

const estilo={
imagen:{
    width :"25%"
}
}
