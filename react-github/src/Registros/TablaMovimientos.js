import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ls from 'local-storage';

const TablaMovimientos = (props) => {
    if (!ls.get("user")){
        let Regis = {
          IdAdmi: 0,
          Nombre: "",
          Apellido: "",
          Correo: "", 
          Celular: "",
          Contrasenia: ""
        }
      ls.set("user", Regis)
      }
    //Si no se ha iniciado sesion que se redireccione al login
    if (ls.get("user").IdAdmi === 0) {
        props.history.push("/IniciarSesion")
    }

    const [listaMovimientos, setListaMovimientos] = useState([]);

    //El use effect nos permite cargar el listado de movimientos cuando la pagina cargo.   
    useEffect(() => {
        async function cargarMovimientos() {
            try {
                let respuesta =
                    await axios.get('https://localhost:5001/api/movimientos/' + ls.get("user").IdAdmi);
                if (respuesta && respuesta.data) {
                    setListaMovimientos(respuesta.data);
                }
            } catch (e) {
                console.log('error' + e);
            }
        }
        cargarMovimientos();
    }, [])


    const mostrarMovimiento = (movimiento) => {
        return (
            <tr id="trMovimiento" key={Math.floor(Math.random() * (100000 - 1)) + 1}>
                <th className="font-weight-normal ml-4 pb-0 mb-0 row">
                    {movimiento.nombre} {movimiento.apellido}
                    <div className="text-info col-auto ml-auto">
                        <span><small><b>{movimiento.tipo}</b></small> </span>
                    </div>
                </th>
                <td className="ml-4 pb-0 pt-0 mt-0 row">
                    <span><small>ID {movimiento.idCliente}</small></span>
                </td>
                <td className="ml-4 pb-0 pt-0 mt-0 mb-3 row">
                    <span><small>{new Date(movimiento.fecha).toLocaleDateString()} | {new Date(movimiento.fecha).toLocaleTimeString()}</small></span>
                </td>
            </tr>
        )
    }

    const mensajeListaVacia = () => {
        if (listaMovimientos.length === 0) {
            return (<div className="text-center"><span>No tienes movientos registrados aun.</span></div>)
        }
    }

    const cerrarSesion = () => {
        let Regis = {
            IdAdmi: 0,
            Nombre: "",
            Apellido: "",
            Correo: "",
            Celular: "",
            Contrasenia: ""
        }
        ls.set("user", Regis);
        props.history.push("/");
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-end container">
                {(ls.get("user").IdAdmi) !== 0 ?
                    <button className="btn btn-link mt-2" onClick={cerrarSesion}>Cerrar sesion</button> : ""
                }
            </div>
            <br />
            <div className="d-flex justify-content-between">
                <h1>Historial</h1>
                <h1 className="text-secondary">{ls.get("user").Nombre !== "" ? "¡Hola, " + ls.get("user").Nombre + "!" : ""} </h1>
            </div>
            <table id="tablaMovimientos" className="table table-responsive-sm table-borderless">
                <tbody>
                    {listaMovimientos.map(element => (mostrarMovimiento(element)))}
                </tbody>
            </table>
            {mensajeListaVacia()}
        </div>
    )
}

export default TablaMovimientos;
