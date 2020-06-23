import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import { Paper, Tabs, Tab, Button, Grid, Dialog, DialogTitle } from "@material-ui/core";
import TablaTutores from "./TablaTutores.js";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { getUser } from "../../Sesion/Sesion";
//import DialogTitle from "@material-ui/core/DialogTitle";

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


class FrmSolicitarTutorTipoII extends Component {
    constructor() {
        super();
        this.state = {
            tutores: {
                columns: [{
                    title: "Nombre",
                    field: "nombre",
                }],
                data: [{ nombre: "" }]
            }, //aqui va el nombre de la tablilla
            openSolicitarTutor: false,
            openVerDispo: false,
            _tutorFijo:0,
            mensajillo:"",

        };

        {/* 
        this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        */}
        this.handleOnClickSolicitarTutor = this.handleOnClickSolicitarTutor.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnClickVerDispo = this.handleOnClickVerDispo.bind(this);
        this.handleOnCloseVerDispo = this.handleOnCloseVerDispo.bind(this);
    };


    async handleOnClickSolicitarTutor(e,_idTutorFijo) {
        //this.setState( {openSolicitarTutor : true});


        console.log("ZZZ ",_idTutorFijo);
        await this.setState({_tutorFijo:_idTutorFijo});
        console.log("ZZZ AFTER ",this.state._tutorFijo);



        let yo = getUser();
        const nuevaSolicitud = {
            solicitud: {
                ID_PROCESO_TUTORIA:this.props.frmIdProceso,
                ID_TUTOR:this.state._tutorFijo,
                ID_ALUMNO:yo.usuario.ID_USUARIO,
            },
        };


        const props = { servicio: "/api/solicitud/enviar", request: nuevaSolicitud };

        console.log("NUEVA SOLIXXXXX ",nuevaSolicitud);

        let sesionTyS = await Controller.POST(props);
        console.log("TutoFIJOOO tYS XXX ",sesionTyS);

       
       if(sesionTyS){
           this.setState({mensajillo:"SOLICITUD REGISTRADA SASTISFACTORIAMENTE !"});  
       }else{
           this.setState({mensajillo:"UPS, ERROR INESPERADO!    POR FAVOR, INTÉNTELO MÁS TARDE"});  
       }

       this.setState({openSolicitarTutor:true });

    }

     handleOnClose() {
        //console.log("ctm",this.state.openSolicitarTutor);
        this.setState( {openSolicitarTutor : false});


       



    }

    //=============================================================
    handleOnClickVerDispo() {
        this.setState( {openVerDispo : true});
    }

    handleOnCloseVerDispo() {
        //console.log("ctm",this.state.openSolicitarTutor);
        this.setState( {openVerDispo : false});
    }

    async componentDidMount() {
        let arregloDeTutores = 
        await Controller.GET({ servicio: "/api/tutor/lista/"+getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ID_PROGRAMA });
        /**if arreglo ttores hago lo q esta sino le meto s harcodeo */
        console.log("arreglo: ", arregloDeTutores);

        let arreglillo = [];
        let cont = 0;
        for (let element of arregloDeTutores.tutores) {
            cont++;
            arreglillo.push({
                imagen: <div>
                <img
                    style={estilo.imagen}
                    src="https://files.pucp.education/profesor/img-docentes/tupia-anticona-manuel-francisco-19931850.jpg">
                </img>
                </div>,
                //numeroOrden: cont,
                nombre: element.USUARIO.NOMBRE + " " + element.USUARIO.APELLIDOS,
                correo: element.USUARIO.CORREO,
                /*rboton: <div>
                    <input
                        type="radio"
                        id="age1"
                        name="tutor"
                        value={element.ID_TUTOR}>
                    </input>
                </div>,*/
                btnVerDisponibilidad:
                <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    onClick={this.handleOnClickVerDispo}
                >
                    Ver Disponibilidad
                </Button>,
                btnSolicitarTutor:
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={e=>this.handleOnClickSolicitarTutor(e,element.ID_TUTOR)}

                    //onClick={e=>this.handleOnClick(e,element.ID_SESION,element.ID_TUTOR)}
                    

                >
                    SOLICITAR TUTOR
                </Button>,
            });
        }

        /*arregloDeTutores.forEach(element => {
            arreglillo.push({nombre:element.USUARIO.NOMBRE+" "+element.USUARIO.APELLIDOS,
                            correo:element.USUARIO.CORREO});       

        }); */

        const data = {
            columns: [
                {
                    title: "",
                    field: "imagen",
                },
                {
                    title: "TUTOR",
                    field: "nombre",
                },
                {
                    title: "CORREO ELECTRÓNICO",
                    field: "correo"
                },
                /*
                {
                    title: "",
                    field: "rboton"
                },
                */
                {
                title: "",
                field: "btnVerDisponibilidad",
                },
                {
                title: "",
                field: "btnSolicitarTutor",
                },
                /*  {},{},{}.... para mas columnas  */
            ],
            data: arreglillo
            /*
            [       
              { nombre: "Alva Nuñez",correo :"ing informatica" },
              { nombre: "Pedro Arce" ,correo :"ing informatica2"},
              { nombre: "Alfredo Gomez",correo :"ing informatica3" },
              { nombre: "Bill Grace",correo :"ing informatica4" },
              { nombre: "Camilo Echeverry" ,correo :"ing informatica5"},
            ],*/

        };

        this.setState({ tutores: data });

    }

    render() {
        console.log("propsFormTipoII:", this.props);
        return (
            <div>
                <Dialog
                    open={this.state.openSolicitarTutor}
                    onClose={this.handleOnClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >
                        <h3 >Resultado </h3>

                    </DialogTitle>
                    <DialogContent>
                        {this.state.mensajillo}
                    </DialogContent>
                    <DialogActions>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnClose}>

                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Paper elevation={0} style={style.paper}>
                    
                    {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                    <TablaTutores tutores={this.state.tutores} />
                    

                </Paper>

                <Dialog
                    open={this.state.openVerDispo}
                    onClose={this.handleOnCloseVerDispo}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <Grid container xs={12}>
                            <Paper style={style.paper}>
                                >> Redireccionando al calendario de disponibilidades de tutores...
                            </Paper>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button                            
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnCloseVerDispo}                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FrmSolicitarTutorTipoII;

const estilo = {
    imagen: {
        width: "30%",
        borderRadius: "100%",
    }
}
















