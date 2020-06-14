import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListaFacultades from "./ComboBoxFacultades";
import ListaProgramas from "./ListaProgramas";
import ListaProcesoTut from "./ListaProcesoTut";
import ListaTutores from "./ListaTutores";
import ListaAlumnos from "./ListaAlumnosPorPrograma";
import { GET } from "../../../Conexion/Controller";
import * as Controller from "../../../Conexion/Controller";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Seleccionar Facultad', 'Seleccionar Programa', 
  'Seleccionar Proceso de Tutoria','Seleccionar Tutor','Seleccionar Alumno(s)',
  'Guardar'];
}


const VerticalLinearStepper= () =>  {
  const [datosForm, setDatosForm] = React.useState({
    programa: "",
    tutor: "",
    tutoria: "",
    alumnos:[],
  });
  const classes = useStyles();
  const [subprograma,setSubprograma]=useState([]);
  const [tutoria,setTutoria]=useState([]);
  const [tutor,setTutor]=useState([]);
  const [alumnos,setAlumnos]=useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [programa, setPrograma] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [pDisabled, setPDisabled] = useState(true);
  const steps = getSteps();


  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/facultad";
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      setProgramas(res.facultad);
      console.log("facultad:", programa);
    }
     fetchData();
  }, {});

  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleOnChangePrograma = (subprograma) => {
    console.log("subprograma: ",subprograma );
    setSubprograma(subprograma);
  };
  const handleOnChangeTutoria = (tutoria) => {
    console.log("tutoria: ",tutoria );
    setTutoria(tutoria);
  };
  const handleOnChangeTutor = (tutor) => {
    console.log("tutoria: ",tutor );
    setTutor(tutor);
  };
  const handleOnChangeAlumnos = (alumnos) => {
    console.log("alumnos: ",alumnos );
    setAlumnos(alumnos);
  };

  const handleClick = async(e) =>{
    e.preventDefault();
    const nuevaAsignacion = {
      asignacionTutoria: {
        PROCESO_TUTORIA: tutoria,
        TUTOR: tutor,
        ALUMNOS: alumnos,
        FECHA_ASIGNACION: new Date(),
      },
    };
      const props = { servicio: "/api/asignacion", request: nuevaAsignacion };
      console.log("saving new asignacion in DB:", nuevaAsignacion);
      let asignado = await Controller.POST(props);
      console.log("asignado",asignado);
      if (asignado) {
        alert("Alumno asignado Satisfactoriamente");
      }
      console.log("got updated alumno from back:", asignado);
    
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return(
          <div>
            <ListaFacultades
              setPDisabled={setPDisabled}
              programas={programas}
              programa={programa[0]}
              setPrograma={setPrograma}
            />
          </div>
        );
      case 1:
        console.log("fac: ",programa);
        let fac=programa;
        return(
          <div>
            <ListaProgramas
              titulo={"Programas"}
              escogerPrograma={handleOnChangePrograma}
              enlace={"/api/programa/lista/"+programa}
            />
          </div>
        );
      case 2:
        console.log("subprog: ",subprograma);
        return(
          <div>
            <ListaProcesoTut
              titulo={"Proceso de Tutoría"}
              escogerTutoria={handleOnChangeTutoria}
              enlace={"/api/tutoria/lista/"+subprograma}
            />
          </div>
        );
      case 3:
        console.log("tutoria: ",tutoria);
        return(
          <div>
            <ListaTutores
              titulo={"Tutor"}
              escogerTutor={handleOnChangeTutor}
              enlace={"/api/tutor/lista/"+subprograma}
            />
          </div>
        );
      case 4:
        console.log("tutor: ",tutor);
        return(
          <div>
            <ListaAlumnos
              escogerAlumnos={handleOnChangeAlumnos}
              enlace={"/api/alumno/lista/"+subprograma}
            />
          </div>
        );
      case 5:
        return(
          <div>
            <Button 
            variant="contained"
            color="primary"
            onClick={handleClick}>
            Guardar
           </Button>
          </div>
        );
    }
  }
  
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
             <Typography variant="h5">{label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography >{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Asignación Registrada Satisfactoriamente</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Volver a Empezar
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default VerticalLinearStepper;