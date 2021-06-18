import React, { useState, useEffect } from 'react';
import FormAgregar from './FormAgregar';
import TablaRegistros from './TablaRegistros';
import axios from 'axios';
import ls from 'local-storage';

function EspacioDeTrabajo(props) {
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
  if(ls.get("user").IdAdmi === 0){
    props.history.push("/IniciarSesion")
  }

  //State para la lista de registros 
  const [listaRegistros, setListaRegistros] = useState([]);

  //Cargamos los datos usando el async y await
  //El useEffect funcina como el componentDidMount que usa el ing.
  useEffect(() => {
      async function cargarCreditos(){
        try{
          let respuesta = await axios.get('https://localhost:5001/api/creditos/' + ls.get("user").IdAdmi);
          if(respuesta && respuesta.data){  
            setListaRegistros(respuesta.data);
          }
        }catch(e){
          console.log(e);
        }
      }
      cargarCreditos();
  }, [])

  //State para el registro
  const [datos, setDatos] = useState({
    id: 0,
    nombre: '',
    apellido: '',
    deuda: '',
  })

  //Funcion para agregar movimientos
  const agregarMovimiento = async (tipo, credito) => {
    //tipo: de movimiento.
    //credito: datos del credito que lo disparo.

    let movimiento = {
      idCliente: credito.idCliente,
      tipo: tipo,
      fecha: new Date().toJSON()
    }
    
    try{
      await axios.post('https://localhost:5001/api/movimientos', movimiento);
    }catch(e){
      console.log(e);
    }
  }

  //Funcion para abrir el formulario editar
  const abrirFormEditar = (idCliente) => {
    let indice = listaRegistros.findIndex(r => r.idCliente === idCliente);
    props.history.push("/FormEditar", listaRegistros[indice]);
  }

  //Funcion se llama al darle al boton cerrar sesion
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
    <div>
      <div className="d-flex justify-content-end container">
        {(ls.get("user").IdAdmi) !== 0 ?
          <button className="btn btn-link mt-2" onClick={cerrarSesion}>Cerrar sesion</button> : ""
        }
      </div>
      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h1 className="mb-5">Espacio de trabajo</h1>
          <h1 className="text-secondary">
            {ls.get("user").Nombre !== "" ? "¡Hola, " + ls.get("user").Nombre+"!"  : ""}
          </h1>
        </div>

        <FormAgregar
          agregarMovimiento={agregarMovimiento}
          datos={datos}
          setDatos={setDatos}
          listaRegistros={listaRegistros}
          setListaRegistros={setListaRegistros}
        />
        <div>
          <TablaRegistros
            agregarMovimiento={agregarMovimiento}
            abrirFormEditar={abrirFormEditar}
            listaRegistros={listaRegistros}
            setListaRegistros={setListaRegistros}
          />
        </div>
      </div>
      <br/>
      <br/>
    </div>
  );
}

export default EspacioDeTrabajo;
