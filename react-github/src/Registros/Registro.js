import React from 'react';
import ls from 'local-storage';
import axios from 'axios';

const Registro = ({ listaRegistros, setListaRegistros, registro, abrirFormEditar, agregarMovimiento }) => {
    const regist = registro;

    //Funcion para eliminar un registro
    const Eliminar = async (e) => {
        e.preventDefault();
        let mensaje = "Esta a punto de eliminar un registro permanentemente, confirmar:" +
            "\n(Esta accion borrara los movimientos registrados para este credito)."

        if (window.confirm(mensaje)) {
            let lista = listaRegistros;
            let indice = lista.findIndex(r => r.idCliente === regist.idCliente);

            try {
                let respuesta =
                    await axios.delete('https://localhost:5001/api/creditos/' + listaRegistros[indice].idCliente.toString());
                if (respuesta && respuesta.data) {
                    lista.splice(indice, 1);
                    ls.set("listaRegistros", lista);
                    setListaRegistros(ls.get("listaRegistros"));
                }
            } catch (e) {
                console.log('error' + e);
            }
        }
    }

    //Esta funcion permite sumar o restar a la deuda.
    const operaciones = async (e) => {
        e.preventDefault();
        if (e.target.value === "SUMAR" || e.target.value === "RESTAR") {
            let texto = e.target.value;
            //Pedimos el valor y hacemos las validaciones necesarias 
            let valor = window.prompt("Cantidad para " + texto + " a la deuda: ");
            let tipo = "";
            if (valor && !isNaN(valor)) {
                valor = parseFloat(valor);
                if (e.target.value === "SUMAR") {
                    if (valor < 0) {
                        valor = valor * -1;
                    }
                    tipo = "Credito: +" + valor;
                } else {
                    if (valor > 0) {
                        valor = valor * -1;
                    }
                    tipo = "Abono: " + valor;
                }

                //Hacemos las modificaciones a la deuda del registro especificado
                let nuevoMontoDeuda = parseFloat(regist.deuda) + valor;
                let lista = listaRegistros;
                let indice = lista.findIndex(r => r.idCliente === regist.idCliente);
                lista[indice] = {
                    idCliente: regist.idCliente,
                    nombre: regist.nombre,
                    apellido: regist.apellido,
                    deuda: (nuevoMontoDeuda > 0) ? nuevoMontoDeuda : 0
                };

                //Creamos y pasamos el credito a la API para registrarlo en la BD
                let CreditoAPI = {
                    idCliente: regist.idCliente,
                    idAdmi: ls.get("user").IdAdmi,
                    Nombre: regist.nombre,
                    Apellido: regist.apellido,
                    Deuda: (nuevoMontoDeuda > 0) ? nuevoMontoDeuda : 0
                }

                try {
                    let respuesta =
                        await axios.put('https://localhost:5001/api/creditos/' + CreditoAPI.idCliente, CreditoAPI);
                    if (respuesta && respuesta.data) {
                        ls.set("listaRegistros", lista);
                        setListaRegistros(ls.get("listaRegistros"));
                    }
                } catch (e) {
                    console.log('error' + e);
                }

                //Lo agregamos como movimiento
                agregarMovimiento(tipo, CreditoAPI);
            }
        }

    }

    return (
        <tr className="d-flex-lg">
            <th scope="row" className="col-lg-2">{registro.idCliente}</th>
            <td className="col-lg-2">{registro.nombre}</td>
            <td className="col-lg-2">{registro.apellido}</td>
            <td className="col-lg-2">{registro.deuda.toFixed(2)}</td>
            <td className="text-center col-lg-2">
                <button onClick={(e) => operaciones(e)} value="SUMAR" title="Sumar a la deuda" className="btn btn-outline-secondary mr-md-1 mr-lg-1"><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button onClick={(e) => operaciones(e)} value="RESTAR" title="Restar a la deuda" className="btn btn-outline-secondary mr-md-1 mr-lg-1"><i className="fa fa-minus" aria-hidden="true"></i></button>
            </td>
            <td className="text-center col-lg-2">
                <button type="button" title="Editar registro" onClick={(e) => abrirFormEditar(regist.idCliente)} className="btn btn-primary mr-md-1 mr-lg-1"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                <button type="button" title="Eliminar registro" onClick={Eliminar} value="Eliminar" className="btn btn-danger mr-md-1 mr-lg-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
            </td>
        </tr>
    );
}

export default Registro;