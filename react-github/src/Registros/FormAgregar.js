import React from 'react';
import axios from 'axios';
import ls from 'local-storage';

const FormAgregar = ({ datos, setDatos, listaRegistros, setListaRegistros, agregarMovimiento }) => {
    //Va guardando la informacion de los inputs en el state
    const handleInputChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const validarDatos = () => {
        if (datos.nombre.trim() !== '' && datos.apellido.trim() !== '' && datos.deuda !== null) {
            return true;
        }
        return false;
    }

    //Se ejecuta al darle al boton agregar y guarda los datos en el local-storage
    const agregarRegistro = async (e) => {
        e.preventDefault();
        if (validarDatos()) {
            let registro = {
                idCliente: 0,
                idAdmi: ls.get("user").IdAdmi,
                nombre: datos.nombre.trim(),
                apellido: datos.apellido.trim(),
                deuda: (!datos.deuda || isNaN(datos.deuda)) ? 0 : parseFloat(datos.deuda)
            };

            //Agregamos el credito(registro) a la tabla

            try {
                let respuesta = await axios.post('https://localhost:5001/api/creditos', registro);
                if (respuesta && respuesta.data) {
                    let lista = listaRegistros;
                    registro.idCliente = respuesta.data.estado;
                    lista.push(registro);
                    ls.set("listaRegistros", lista);
                    setListaRegistros(ls.get("listaRegistros"));
                    //Lo agregamos como movimiento
                    agregarMovimiento("Registro", registro);
                }
            } catch (e) {
                console.log(e);
            }

            //Limpiamos los inputs 
            setDatos({
                nombre: '',
                apellido: '',
                deuda: ''
            })
        } else {
            alert("Los datos no pueden estar vacios.");
        }
    }

    return (
        <form onSubmit={agregarRegistro}>
            <div className="row">
                <div className="col-lg col-md mr-lg-3 mr-md-3 mb-1">
                    <input value={datos.nombre} type="text" name="nombre" onChange={handleInputChange} className="p-auto form-control" placeholder="Ingrese el nombre" />
                </div>
                <div className="col-lg col-md mr-lg-3 mr-md-3 mb-1">
                    <input value={datos.apellido} type="text" name="apellido" onChange={handleInputChange} className="p-auto form-control" placeholder="Ingrese el apellido" />
                </div>
                <div className="col-lg col-md mr-lg-3 mr-md-3 mb-1">
                    <input value={datos.deuda} type="number" step="0.01" name="deuda" onChange={handleInputChange} className="p-auto form-control" placeholder="Ingrese la deuda" />
                </div>
                <div className="col-lg col-md">
                    <input type="submit" value="Agregar" className="btn p-auto btn-success form-control" placeholder="Ingrese la deuda"></input>
                </div>
            </div>
        </form>
    );
}

export default FormAgregar;