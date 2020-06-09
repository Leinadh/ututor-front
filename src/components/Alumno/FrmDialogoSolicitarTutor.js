import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import { Grid, Chip, Paper } from "@material-ui/core";

const styles = {
    paper: {
        marginTop: "10%",
        marginLeft: "3%",
        marginRight: "3%",
        flexDirection: "column",
        backgroundImage: "",
    },
    chip: {
        textAlign: "center"
    }
};

class FrmDialogoSolicitarTutor extends Component {
    render() {
        return (
            <div >
                <Paper elevation={3} style={styles.paper}>
                    <Grid container spacing={2} alignContent="center" style={styles.chip}>
                        <Grid item md={4} xs={4}>
                            <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />
                        </Grid>
                        <Grid item md={8} xs={8} >
                            <h1>Fernando Carrillo</h1>
                            <p>Tutor</p>
                            <p>Lunes 28 de Junio del 2020</p>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={styles.paper}>
                    <Grid container spacing={2} alignContent="center" style={styles.chip}>    
                        <Grid item md={6}  style={styles.chip}>
                            <p>Inicio: </p>
                            <Chip label="Hora inicio" color="primary"  />
                        </Grid>
                        <Grid item md={6} style={styles.chip}>
                            <p>Fin: </p>
                            <Chip label="Hora fin" color="primary"  />
                        </Grid>
                        <Grid item md={8} xs={8} >
                            <h1>Motivo: </h1>
                            
                        </Grid>
                        <Grid item md={8} xs={8} >
                            <h1>Descripción: </h1>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default FrmDialogoSolicitarTutor;