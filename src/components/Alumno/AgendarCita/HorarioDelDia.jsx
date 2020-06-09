import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { diasSemana, fechaEstandar } from "./Util.js";
import DisponibilidadCard from "./DisponibilidadCard";
import { GET } from "../../../Conexion/Controller.js";
import "./Horario.css";
import ArregloHorarios from "./ArregloHorarios.jsx";
const styles = {
  paper: {
    marginTop: "1%",
    flexDirection: "column",
    backgroundImage: "",
    minHeight: "500px",
    maxHeight: "800px",
    whiteSpace: "nowrap",
  },
  control: {
    textAlign: "center",
  },
  titutloDia: {
    borderTop: "2px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
};
/**
 * Recibo una fecha (Date) y sobre esta es que me renderizo XD
 */
class HorarioDelDia extends Component {
  constructor() {
    super();
    this.state = {
      diaSemanaStr: "Lunes",
      diaSemanaNum: 1,
      fecha: "",
      horarios: [],
      disponibilidades: "",
    };
    //this.renderHorarios = this.renderHorarios.bind(this);
    this.renderCabecera = this.renderCabecera.bind(this);
  }

  renderCabecera = (fecha) => {
    const cabecera = new Date(fecha);
    return (
      <div style={styles.titutloDia}>
        <Typography
          variant="button"
          component="h2"
          style={styles.control}
          display="block"
          gutterBottom
        >
          <strong>
            {diasSemana[cabecera.getDay()] + " " + cabecera.getDate()}
          </strong>
        </Typography>
        
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.renderCabecera(this.props.fecha.fecha)}
        <div className="tituloDia" elevation={5} style={styles.paper}>
          <ArregloHorarios servicio={this.props.fecha.servicio}/>
        </div>
      </div>
    );
  }
}

export default HorarioDelDia;