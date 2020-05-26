import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(35),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const Programas = [
//   { id: 1, nombre: "Programa Tipo1" },
//   { id: 2, nombre: "Programa Tipo2" },
//   { id: 3, nombre: "Programa Tipo3" },
// ];

const ComboBoxPrograma = (props) => {
  const classes = useStyles();
  const { setPDisabled, programas, programa, setPrograma } = props;

  const handleChangePrograma = (event) => {
    setPrograma(event.target.value);
    setPDisabled(false);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Programa</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={programa}
        onChange={handleChangePrograma}
      >
        {programas.map((item) => (
          <MenuItem key={item.ID_PROGRAMA} value={item.ID_PROGRAMA}>
            {item.ID_PROGRAMA}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBoxPrograma;