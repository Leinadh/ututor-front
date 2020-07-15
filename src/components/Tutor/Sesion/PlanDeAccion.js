import React,{useState} from "react";
import * as Conexion from "../../../Conexion/Controller";
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
    
const PlanDeAccion = (props) => {
    console.log("PLAN DE ACCION: ", props);
    const { plan, setPlan,ultimoCompromiso } = props;
    console.log("plantest", plan);
    console.log("CANT COMPROMISOS: ", plan.length);
    const [cantCompromisos, setCantCompromisos]=useState(plan.length);
    //const [plan,setPlan]=useState([]);
    const [compromiso,setCompromiso]=useState({
        campo:'',
        check:false, 
    });
    
    const handleCompromiso = async (e) => {
      for (let i=0; i<100; i++) {
        console.log("BABA: ", document.getElementById(i));
        if (document.getElementById(i) === null) {
          break;
        }
        document.getElementById(i).value = e.target.value.substring(0,50);
      }
      console.log("comp",e.target.value);
      setCompromiso({
        ...compromiso,
        campo: e.target.value,
      });
      await ultimoCompromiso(compromiso);
  
    }; 
    const handleCantCompromisos = (func) => {
      console.log("func: ",func)
      
      if (func>0){
        if (func>cantCompromisos){
          setCantCompromisos(cantCompromisos => func);
          plan.push(compromiso);
          console.log("plan",plan);
        }else{
          setCantCompromisos(cantCompromisos => func);
          plan.splice(-1);
          console.log("plan",plan);
        }        
      }else{
        setCantCompromisos(cantCompromisos => 0);
      }
    };
    
    const renderCompromisos = (plan) => {
        console.log("cant=",plan.length);
        let n=plan.length;
        let arregloPlan=[];
        // for (let i=0;i<n;i++){
        //   arregloPlan.push(i);
        // }
          return(
            <div>
              {plan.map((item) => (  
                <Grid>
                  {item.DESCRIPCION!=="" &&
                    <Checkbox color="primary" id={cantCompromisos}>                     
                    </Checkbox>}
                    {item.DESCRIPCION!=="" &&
                  <TextField margin="dense" style={{ width: 300 }}
                    id={cantCompromisos}
                    defaultValue={item.DESCRIPCION}
                    onChange={(e) => handleCompromiso(e)}>
                  </TextField> }
    
                </Grid>          
                 
            ))}
    
            </div> 
        );    
    }
  
    return (
      <>
        <Grid item md={12} justify="center" >
            <Paper elevation={0} style={style.paperitem}>
                <Typography variant="h6">
                    Plan de Acción
                </Typography>
            </Paper>
        </Grid>
        <Grid item md={12}
            container
            justify="flex-start" >
            {/* <Checkbox color="primary" id={cantCompromisos}>
                    
            </Checkbox>
            <TextField margin="dense" style={{ width: 300 }}
              id={cantCompromisos}
              onChange={(e) => handleCompromiso(e)}>
            </TextField>  */}
            <IconButton color="primary" onClick={()=> handleCantCompromisos(cantCompromisos+1)}>
            <AddBoxRoundedIcon
            color="primary"
            fontsize="large" />
            </IconButton> 
            <IconButton color="primary" onClick={()=> handleCantCompromisos(cantCompromisos-1)}>
            <IndeterminateCheckBoxRoundedIcon
            color="primary"
            fontsize="large" />
            </IconButton>     
            <br></br>              
            {cantCompromisos>0 ? renderCompromisos(plan): null} 
        </Grid>
      </>
    );
  };
  
  export default PlanDeAccion;