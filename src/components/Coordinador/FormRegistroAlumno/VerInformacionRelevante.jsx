import React, { Component } from "react";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";
import JUploadSSJ from "jin-upload-ssj2";
import { GET } from "../../../Conexion/Controller";
import { IconButton, Grid, Paper ,Button} from "@material-ui/core";
import MaterialTable from "material-table";
import CampoDeTexto from "../Tutorias/CampoDeTexto";
//import JDownloadButtonIcon from "downloadssj";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RestorePageTwoToneIcon from "@material-ui/icons/RestorePageTwoTone";

const estilos = {
  paper: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
  },
  margen: {
    marginTop: "1%",
    marginLeft: "4%",
    marginRight: "4%",
  },
  divini: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginRight: "4%",
  },
};
class VerInformacionRelevante extends Component {
  constructor() {
    super();
    this.state = {
      extension: "",
      archivo: undefined,
      tipoDialogo: 0,
      open: false,
      currentID: 0,
      alumno: {},
      title1: "Resultados historicos del alumno",
      title2: `al ${new Date().toISOString().split("T")[0]}`,
      datosTabla: {},
      datosTablaOffline: {
        columns: [
          { title: "Nro", field: "nro" },
          { title: "Nombre del archivo", field: "nombreArchivo" },
          { title: "Vista Previa", field: "vistaPrevia" },
          { title: "Descargar", field: "descargar" },
        ],
        data: [],
      },
    };
    this.removerDatos = this.removerDatos.bind(this);

    this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
    this.handleDescargar = this.handleDescargar.bind(this);
    this.getArchivo = this.getArchivo.bind(this);
  }
  renderTabla(datosNuevos) {
    console.log("***", datosNuevos);
    if (datosNuevos !== this.state.datosNuevos) {
      //asegurarme de no renderizar si no vale la pena
      return (
        <MaterialTable
          columns={this.state.datosTabla.columns}
          data={this.state.datosTabla.data}
          options={{
            //selection: true,
            rowStyle: {
              backgroundColor: "#FFF",
            },
            headerStyle: {
              backgroundColor: "#3AAFA9",
              color: "#ffffff",
              fontSize: 14,
            },
          }}
          title={`Archivos del Alumno`}
        />
      );
    }
  }
  async getArchivo(idArchivo) {
    const archivoOutput = await GET({
      servicio: `/api/alumno/informacionrelevante/descargar/${idArchivo}`,
    });
    this.setState({extension: archivoOutput.informacionRelevante.DESCRIPCION.split('.')[1]});
    console.log("KAMEEEEE: ", archivoOutput.informacionRelevante.ARCHIVO);
    return "data:application/pdf;base64,"+archivoOutput.informacionRelevante.ARCHIVO;
  }

  async handleVistaPrevia(e, idArchivo) {
    const { archivo } = this.state;
    if (archivo) {
      if (archivo.idArchivo !== idArchivo) {
        // si hay archivo i los id son dif,pide al back y muestra
        this.setState({ archivo: undefined });
        const archivo = await this.getArchivo(idArchivo);
        await this.setState({ archivo });
      } else {
        //ya esta cargado, so, no hagas nada
      }
    } else {
      //no hay archivos, lo cargo en memoria
      const archivo = await this.getArchivo(idArchivo);
      await this.setState({ archivo });
    }
  }
  async handleDescargar(e, idArchivo) {
    const { archivo } = this.state;
    if (archivo) {
      if (archivo.idArchivo !== idArchivo) {
        this.setState({ archivo: undefined });
        const archivo = await this.getArchivo(idArchivo);

        await this.setState({ archivo });
        this.clickInput();
      } else {
        this.clickInput();
      }
    } else {
      const archivo = await this.getArchivo(idArchivo);
      
      await this.setState({ archivo });
      this.clickInput();
    }
  }
  async componentDidMount() {
    if (!this.props.idAlumno) return;
    let listaResultados = await GET({
      servicio: `/api/alumno/informacionrelevante/${this.props.idAlumno}`,
    });
    let datos = [];
    if (!listaResultados) return;
    if (listaResultados.informacionRelevante) {
      listaResultados.informacionRelevante.forEach((archivo, index) => {
        const { ID_INFORMACION_RELEVANTE, DESCRIPCION } = archivo;
        datos.push({
          nro: index + 1,
          nombreArchivo: DESCRIPCION,
          vistaPrevia: (
            <IconButton>
              <VisibilityTwoToneIcon
                fontSize="large"
                color="primary"
                aria-label="add"
                name="view"
                onClick={(e) =>
                  this.handleVistaPrevia(e, ID_INFORMACION_RELEVANTE)
                }
              />
            </IconButton>
          ),
          descargar: (
            <GetAppSharpIcon
              fontSize="large"
              name="download"
              color="primary"
              aria-label="add"
              onClick={(e) => this.handleDescargar(e, ID_INFORMACION_RELEVANTE)}
            />
          ),
        });
      });
      await this.setState({
        datosTabla: {
          columns: this.state.datosTablaOffline.columns,
          data: datos,
        },
      });
    }
  }
  clickInput() {
    const inputElement = document.getElementById("superDownload");
    inputElement.click();
  }
  removerDatos(){
this.setState({ archivo: undefined });
  }
  render() {
    return (
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        {/**tabla de informacuion historica */}
        <Grid item md={4} xs={12}>
          {this.renderTabla(this.state.datosTabla)}
        </Grid>
        {/** vista previa y opcion de descarga */}
        <Grid item md={8} xs={12}>
        <Grid container spacing={0}>
            {this.state.archivo ? (
              <Grid item md={2} xs={6}>
                <Button
                  color="primary"
                  onClick={() => this.removerDatos()}
                  startIcon={<RestorePageTwoToneIcon />}
                >
                  Deshacer Carga
                </Button>
              </Grid>
            ) : (
              <Grid item md={2} xs={false} />
            )}
            <Grid item md={5} xs={12}>
              <h3>{"Vista Previa: (Solo archivos .pdf)"}</h3>
            </Grid>
            <Grid item md={3} xs={12}>
              <CampoDeTexto
                variant={"outlined"}
                name="nombre"
                label="Descripcion o comentarios"
                requerido={true}
                autoFocus={true}
                inicial={this.state.fileName}
                validacion={{ lim: 25 }}
                onChange={this.handleOnChangeTexto}
                validarEntrada={()=>{}}
                value={this.state.fileName}
              />
            </Grid>
            {this.state.PDFURL || this.state.FILE ? (
              <>
                <Grid item md={2} xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleOnClickRegistroSSJ_masivo}
                    startIcon={<CloudUploadIcon />}
                    disabled={!this.state.FILE}
                  >
                    Registrar
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item md={2} xs={false} />
            )}
          </Grid>
          <a
            id="superDownload"
            href={this.state.archivo}
            style={{ display: "none" }}
            download
          ></a>
          {this.state.archivo && this.state.extension==="pdf"? (
            <div style={estilos.divini}>
              <iframe
                src={this.state.archivo}
                height={800}
                frameborder="1"
                allowfullscreen
                sandbox
                width="100%"
              ></iframe>
            </div>
          ) : (
            <Paper style={estilos.margen}>
              <h2>{"Vista previa(solo pdf):"}</h2>
              <JUploadSSJ
                embebed={true}
                contained={true}
                id_drop_zone={"drop_zone_archivo"}
                onSuccesLoadURL={this.handleOnSuccesLoadURL}
                onSuccesLoad={this.handleOnSuccesLoad}
                formato={this.state.formato}
                maxTamanio={this.state.maxTamanio}
                extension="any"
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default VerInformacionRelevante;
