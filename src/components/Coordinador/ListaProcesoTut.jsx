import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText } from "@material-ui/core";
import * as Conexion from "../../Conexion/Controller";

class ListaProcesoTut extends React.Component {
  constructor() {
    super();
    this.state = {
      tutorias: [
        
      ],
      tutoria: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderTutorias = this.renderTutorias.bind(this);
  }
  async handleOnChange(e) {
      let tutoria = e.target.value;
      let tutorias = [];
      tutorias.push(tutorias.ID_PROCESO_TUTORIA);
    await this.props.escogerTutoria(tutorias);
    this.setState({ tutoria: e.target.value });
    e.target.value=this.state.tutoria;
  }
  renderTutorias = () => {
    return (
      <div>
        {this.state.tutorias.map((tutoria) => (
          <MenuItem key={tutoria.ID_PROCESO_TUTORIA} value={tutoria.NOMBRE}>
            {" "}
            {tutoria.NOMBRE}
          </MenuItem>
        ))}
      </div>
    );
  };
  async componentDidMount() {
    let listaTutorias = await Conexion.GET({servicio:this.props.enlace});
    console.log("programas",listaTutorias);
    this.setState({tutorias:listaTutorias.tutoria});    
    console.log("programas del state",this.state.tutorias);
    
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (nextState.tutorias != this.state.tutorias) {
      return true;
    }
    if (nextState.tutoria != this.state.tutoria) {
      return true;
    }
    if (nextProps.enlace != this.props.enlace){
      return true;
    } 
    return false;
  }
  render() {
    return (
      <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-placeholder-label-label">
          {this.props.titulo}
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.state.tutoria}
          onChange={this.handleOnChange}
          displayEmpty
        >
          {this.state.tutorias.map((tutoria) => (
            <MenuItem key={tutoria.ID_PROCESO_TUTORIA} value={tutoria}>
              {" "}
              {tutoria.NOMBRE}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Escoja el Proceso de Tutoría</FormHelperText>
      </FormControl>
    );
  }
}
export default ListaProcesoTut;