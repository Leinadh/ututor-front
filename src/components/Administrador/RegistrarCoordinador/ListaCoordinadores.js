import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, Grid, IconButton } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaCoordinador from "./TablaCoordinador";
import Button from "@material-ui/core/Button";
import ModificaCoordinador from "./ModificaCoordinador";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class ListaCoordinadores extends React.Component {
  constructor() {
    super();
    this.state = {
        coordinadores: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        open:false,
        idCoord:"",
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);
    this.establecerData = this.establecerData.bind(this);
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);

  }

  establecerData(arregloCoord){
    
    let arreglillo = [];
    for (let element of arregloCoord.coordinadores){
        arreglillo.push({
                        codigo:element.CODIGO,
                        nombre:element.NOMBRE+ " "+ element.APELLIDOS,
                        correo:element.CORREO,
                        boton:<div>  
                                      <IconButton color="primary">
                                          <EditRoundedIcon
                                          color="secondary"
                                          fontsize="large"
                                          onClick={() => this.handleOnOpen(element.ID_USUARIO)}
                                          />
                                      </IconButton>
                                      <IconButton color="primary">
                                          <DeleteRoundedIcon
                                          color="error"
                                          fontsize="large" />
                                      </IconButton> 
                                    {/*<Button
                                      size="large"
                                      variant="outlined"
                                      color="secondary"                        
                                      onClick={() => this.handleOnOpen(element.ID_USUARIO)}
                                  >
                                      Ver Coordinador
                                    </Button>*/}
                                </div>
                        });  
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
          { title:"Correo Electrónico",
            field:"correo"},
           {
            title:"",
            field:"boton"
           }
        ],
        data: arreglillo
      };
      this.setState({coordinadores:data});

  }
  async componentDidUpdate(prevProps){
    if (this.props.coordinadores!==prevProps.coordinadores){
      console.log("fac",this.props.coordinadores);
      let arregloCoord=await Controller.GET({servicio:"/api/coordinador/"});
      
      this.establecerData(arregloCoord);
    }    
  }


  async componentDidMount(){
    let arregloCoord=await Controller.GET({servicio:"/api/coordinador/"});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    
    console.log("arreglo: ",arregloCoord);
    this.establecerData(arregloCoord);
}

handleOnOpen= (id) =>{
  this.setState({ open: true });
  this.state.idCoord=id;
} 
handleOnClose() {
  this.setState({ open: false });
}

render(){
    return (
        <div>
            {this.state.open && 
            <ModificaCoordinador 
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              id={this.state.idCoord}
            />}
            <Paper elevation={0} style={style.paper}>
                <TablaCoordinador coordinadores={this.state.coordinadores}  />
            </Paper>
        </div>
    );
}

}

export default ListaCoordinadores;

const estilo={
imagen:{
    width :"25%"
}
}
