import React from "react";

import Datos from "../../components/Coordinador/Datos";
//import Cabecera from "../../components/Coordinador/Cabecera.js";
import { Grid, makeStyles } from "@material-ui/core";

import LuisR from "../../components/Coordinador/luisRios.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil.js";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = () => {
  const classes = useStyles();
  return (
    <div>
      {/*<Cabecera titulo="Coordinador" nombre="RIOS ALEJOS, Luis Esteban"/> */}
      <CabeceraPerfil titulo="Coordinador" 
                      nombre="RIOS ALEJOS, Luis Esteban"
                      imagen={LuisR}
      />
      <Grid
        container
        xs={12}
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.customContainer}
      >
        <Grid item>
          <Datos />
        </Grid>
      </Grid>
    </div>
  );
};

export default Perfil;