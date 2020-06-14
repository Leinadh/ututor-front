import React,{useState} from "react";
import * as Controller from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PlanDeAccion from './PlanDeAccion';
import { Grid, Paper, makeStyles,Typography, Checkbox } from "@material-ui/core";

const style = {
  paper: {
    marginTop: "4%",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundImage: "",
  },
  paperitem: {
      marginTop: "2%",
      marginLeft: "4%",
    },
    foto: {
      marginTop: "2%",
      marginLeft: "4%",
      marginTop: "4%",
      flexDirection: "row",
      alignItems: "center",
      backgroundImage: "",
    }
};
async function fetchData(cod, datosForm, setDatosForm) {
  const endpoint = "/api/alumno/buscar/" + cod;
  const params = { servicio: endpoint };
  const res = await GET(params);
  console.log("alumnocod",res.alumno);
  datosForm.alumnos.push(res.alumno.ID_ALUMNO);
  setDatosForm({
    ...datosForm,
    alumnoNombre: res.alumno.USUARIO.NOMBRE,
  }); 
  console.log("alumnos: ",datosForm.alumnos);
}
const handleName = (e, datosForm, setDatosForm) => {
  console.log("cod",e.target.value);
  //fetchData(e.target.value);
  setDatosForm({
    ...datosForm,
    alumnoCodigo: e.target.value,
  });
};
const handleFecha = (e, datosForm, setDatosForm) => {
  console.log("fecha",e.target.value);
  setDatosForm({
    ...datosForm,
    fecha: e.target.value,
  });
  console.log("fecha",datosForm.fecha);
};
const handleHoraIni = (e, datosForm, setDatosForm) => {
  console.log("horaini",e.target.value);
  setDatosForm({
    ...datosForm,
    horaini: e.target.value,
  });
  console.log("horaini",datosForm.horaini);

};
const handleHoraFin = (e, datosForm, setDatosForm) => {
  console.log("horafin",e.target.value);
  setDatosForm({
    ...datosForm,
    horafin: e.target.value,
  });
  console.log("horafin",datosForm.horafin);

};
const handleLugar = (e, datosForm, setDatosForm) => {
  console.log("lugar",e.target.value);
  setDatosForm({
    ...datosForm,
    lugar: e.target.value,
  });
  console.log("lugar",datosForm.lugar);

};
const handleResultados = (e, datosForm, setDatosForm) => {
  console.log("resu",e.target.value);
  setDatosForm({
    ...datosForm,
    resultado: e.target.value,
  });
  console.log("resu",datosForm.resultado);

};

const RegistrarSesion = () => {
  const [datosForm, setDatosForm] = React.useState({
    alumnoCodigo:0,
    alumnoNombre:'',
    alumnos:[],
    fecha: new Date(),
    horaini:'',
    horafin:0,
    resultado:'',
    lugar:'',
    descripcion:"",
  });
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e, datosForm, setDatosForm) => {
    const nuevaSesion = {
      sesion: {
        ID_TUTOR: "53",
        ID_PROCESO_TUTORIA: "11",
        LUGAR: datosForm.lugar,
        MOTIVO: "PUCP",
        DESCRIPCION: datosForm.descripcion,
        FECHA: datosForm.fecha,
        HORA_INICIO: datosForm.horaini,
        HORA_FIN: datosForm.horafin,
        RESULTADO: datosForm.resultado,
        COMPROMISOS: ["Study: yes", "Sleep: no"],
        AREAS_APOYO: ["1"],
        ALUMNOS:datosForm.alumnos,
      },
    }
    const props = { servicio: "/api/registrarSesion", request: nuevaSesion };
    console.log("saving new sesion in DB:", nuevaSesion);
    let sesion = await Controller.POST(props);
    console.log("sesion",sesion);
    if (sesion) {
      alert("Sesion registrada Satisfactoriamente");
    }
    console.log("got updated sesion from back:", sesion);
      

    setDatosForm({
      ...datosForm,
    });
};

  

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        Registrar Sesión
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">Registar Sesion</Typography>
        </DialogTitle>
        <DialogContent>
          <Paper elevation={0} style={style.paper}>
          <Grid container md={12} spacing={3}>
            <Grid item md={6}>
              <TextField
                  required
                  id="codigo  "
                  label="Código"
                  variant="outlined"
                  onChange={(e) => handleName(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={1} justify="flex-start">
              <IconButton color="primary" onClick={()=> fetchData(datosForm.alumnoCodigo, datosForm, setDatosForm)}>
                <SearchRoundedIcon
                color="primary"
                fontsize="large" />
              </IconButton> 
            </Grid>
            <Grid item md={12}>
              <TextField
                  id="alumno"
                  label="Alumno"
                  value={datosForm.alumnoNombre}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                  required
                  margin="dense"
                  type="date"
                  id="Fecha"
                  label="Fecha"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleFecha(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <Grid item md={4} >
              <TextField
                  required
                  margin="dense"
                  type="time"
                  id="Hora"
                  label="Hora Inicio"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraIni(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={4} >
              <TextField
                  required
                  margin="dense"
                  type="time"
                  id="Hora fin"
                  label="Hora Fin"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleHoraFin(e, datosForm, setDatosForm)}
                  fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                  id="lugar"
                  label="Lugar"
                  onChange={(e) => handleLugar(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
            <PlanDeAccion/>
            <Grid item md={12} justify="center" >
                <Paper elevation={0} style={style.paperitem}>
                    <Typography variant="h6">
                        Resultados
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={12}
              container
              justify="center" >
              <TextField
                  multiline
                  rows={4}
                  id="res"
                  variant="outlined"
                  onChange={(e) => handleResultados(e, datosForm, setDatosForm)}
                  fullWidth   
              />
            </Grid>
          </Grid>
          </Paper>
          
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={handleClose} color="primary">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            color="primary"
            onClick={(e) => handleClick(e, datosForm, setDatosForm)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RegistrarSesion;