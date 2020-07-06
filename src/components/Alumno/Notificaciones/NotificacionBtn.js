import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  List,
  ListItemText,
  Divider,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import { GET } from "../../../Conexion/Controller";

const useStyle = makeStyles((theme) => ({
  cajaNotif: {
    width: theme.spacing(50),
  },
}));

const NotificacionBtn = (props) => {
  const classes = useStyle();
  const {
    anchorEl,
    menuId,
    isMenuOpen,
    handleMenuClose,
    changeNumNotif,
  } = props;

  const idUsuario = getUser().usuario.ID_USUARIO;

  const [notificaciones, setNotificaciones] = useState([]);
  const [tieneNotif, setTieneNotif] = useState(false);

  useEffect(() => {
    async function fetchNotif() {
      const endpoint = "/api/notificacion/lista/" + idUsuario;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res);
      setNotificaciones(res.notificaciones);
      if (res.notificaciones.length !== 0) {
        setTieneNotif(true);
        changeNumNotif(res.notificaciones.length);
      }
    }

    fetchNotif();
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 70, left: window.screen.width - 50 }}
      id={menuId}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {tieneNotif && (
        <List component="nav" className={classes.cajaNotif}>
          {notificaciones.map((item) => (
            <div key={item.SESION.ID_SESION}>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="subtitle2">
                        {item.SESION.ESTADO.substring(3, 20).toUpperCase() +
                          " - " +
                          item.EMISOR.APELLIDOS +
                          ", " +
                          item.EMISOR.NOMBRE}
                      </Typography>
                      <Typography variant="subtitle1">
                        {item.SESION.RAZON_MANTENIMIENTO}
                      </Typography>
                    </>
                  }
                  secondary={item.SESION.FECHA}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
      {!tieneNotif && (
        <List component="nav" className={classes.cajaNotif}>
          <ListItem>
            <ListItemText primary="No tiene niguna notificación" />
          </ListItem>
        </List>
      )}
    </Menu>
  );
};

export default NotificacionBtn;