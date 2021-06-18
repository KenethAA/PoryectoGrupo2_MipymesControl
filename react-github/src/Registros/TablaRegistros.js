import React from 'react';
import Registro from './Registro';

const TablaRegistros = ({ listaRegistros, setListaRegistros, abrirFormEditar, agregarMovimiento}) => {
    const mensajeListaVacia = () => {
        if(listaRegistros.length === 0){
            return(<div className="text-center"><span>No tienes creditos registrados aun.</span></div>)
        }
    }
    const mostrarTotalDeudas = () => {
        let sumaDeudas = 0;
        if(listaRegistros.length !== 0){
            listaRegistros.map(elemento => (sumaDeudas += parseFloat(elemento.deuda)))
            return (
                <div>
                    <hr/>
                    <div className="text-right">
                        <span>Total de deudas: {sumaDeudas.toFixed(2)}</span>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="mt-3">
            <table id="tabla1" className="table table-responsive-sm table-striped table-light">
                <thead className="thead-dark">
                    <tr className="d-flex-lg">

                        <th className="col-lg-2" id="t-id" scope="row">ID cliente</th>

                        <th className="col-lg-2" id="t-nombre">
                            <button className="btn btn-dark p-0" type="button">
                                    <b>Nombre</b>
                                </button>
                        </th>

                        <th className="col-lg-2" id="t-apellido">
                                <button className="btn btn-dark p-0" type="button">
                                    <b>Apellido</b>
                                </button>
                        </th>

                        <th className="col-lg-2" id="t-monto">
                        <button className="btn btn-dark p-0" type="button">
                                    <b>Monto deuda</b>
                                </button>
                        </th>

                        <th id="t-modificarSaldo" className="text-center col-lg-2">Modificar deuda</th>
                        <th id="t-mofificarRegistro" className="text-center col-lg-2">Modificar registro</th>
                    </tr>
                </thead>
                <tbody>
                    {listaRegistros.map(elemento => (
                    <Registro
                    agregarMovimiento={agregarMovimiento} 
                    abrirFormEditar={abrirFormEditar} 
                    listaRegistros={listaRegistros} 
                    setListaRegistros={setListaRegistros} 
                    registro={elemento} 
                    key={elemento.idCliente}
                    />
                    ))}
                </tbody>
            </table>
            {mensajeListaVacia()}
            {mostrarTotalDeudas()}
        </div>
    );
}

export default TablaRegistros;