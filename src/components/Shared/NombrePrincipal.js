import React from "react";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(3),
  },
}));


const NombrePrincipal = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography component="h1" variant="h5"  className={classes.customContainer}>
        <h2>{props.titulo}</h2>
      </Typography>
    </div>
  );
};

export default NombrePrincipal;