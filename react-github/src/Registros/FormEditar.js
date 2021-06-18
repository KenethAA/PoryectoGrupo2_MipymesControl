import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import ls from 'local-storage';

export const FormEditar = (props) => {
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
      
    let registro = props.location.state; //Obtenemos el id del registro que se paso como parametro

    if (registro === undefined)
        props.history.goBack();

    const guardarCambios = async (values) => {
        //Quita posibles excesos de espacios de el nombre y apellido
        values.nombre = values.nombre.trim();
        values.apellido = values.apellido.trim();

        //Este if revisa si se realizaron cambios
        if (registro.nombre !== values.nombre || registro.apellido !== values.apellido || registro.deuda !== values.deuda) {
            if (values.nombre !== '' && values.apellido !== '') {
                if (window.confirm("Seguro que desea guardar los cambios?")) {
                    //Guardamos la modificacion al credito


                    try {
                        let respuesta = await axios.put('https://localhost:5001/api/creditos/' + registro.idCliente, values);
                        if (respuesta && respuesta.data) {
                            props.history.goBack();
                        }
                    } catch (e) {
                        console.log('error' + e);
                    }

                    //Esta modificacion se guarda como movimiento
                    let movimiento = {
                        idCliente: values.idCliente,
                        tipo: "Modificacion",
                        fecha: new Date().toJSON()
                    }

                    try {
                        await axios.post('https://localhost:5001/api/movimientos', movimiento);
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                window.alert("Favor ingresar los datos")
            }

        } else { //Si no se realizaron cambios, solamente regresa a la pagina anterior sin hacer modificaciones.
            props.history.goBack();
        }

    }

    //Para editar los registros nos ayudaremos de formik

    const formik = useFormik({
        initialValues: {
            idCliente: registro.idCliente,
            idAdmi: ls.get("user").IdAdmi,
            nombre: registro.nombre,
            apellido: registro.apellido,
            deuda: registro.deuda
        },
        onSubmit: values => {
            guardarCambios(values);
        },
    });

    return (
        <div className="container mt-5">
            <div className="d-flex">
                <h1 className="mb-5">Editar registro</h1>
                <div className="ml-auto">
                    <button type="button" title="Regresar." className="btn ml-3 btn-outline-secondary mt-1" onClick={props.history.goBack}>Regresar</button>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Nombre</span>
                    </div>
                    <input required type="text" onChange={formik.handleChange} value={formik.values.nombre} id="nombre" className="form-control" placeholder="Ingrese el nombre" aria-label="Nombre" aria-describedby="basic-addon1"></input>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Apellido</span>
                        </div>
                        <input required onChange={formik.handleChange} value={formik.values.apellido} type="text" id="apellido" className="form-control" placeholder="Ingrese el apellido" aria-label="Apellido" aria-describedby="basic-addon1"></input>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Deuda</span>
                        </div>
                        <input required onChange={formik.handleChange} value={formik.values.deuda} type="number" id="deuda" className="form-control" placeholder="Ingrese la deuda" aria-label="Deuda" aria-describedby="basic-addon1"></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-block mt-4">
                    Guardar cambios
                </button>
            </form>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
