import React from 'react';
import './Registro.css';
import registr from '../Registrarse/registr.jpg'
import { useFormik } from 'formik';
import axios from 'axios';
import ls from 'local-storage';

function Registrarse(props) {
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
    async function guardar(Registro) {
        if (
            Registro.Nombre.trim() !== "" &&
            Registro.Apellido.trim() !== "" &&
            Registro.Email !== "" &&
            Registro.Telefono !== "" &&
            Registro.Contrasena !== "" &&
            Registro.ConfirmarContra !== ""
        ) {
            if (Registro.Contrasena === Registro.ConfirmarContra) {
                let Regis = {
                    IdAdmi: 0, Nombre: Registro.Nombre.trim(), Apellido: Registro.Apellido.trim(), Correo: Registro.Email, Celular: Registro.Telefono,
                    Contrasenia: Registro.Contrasena
                }

                try {
                    let respuesta = await axios.post('https://localhost:5001/api/registrarse', Regis);
                    if (respuesta || respuesta.data) {
                        Regis.Contrasenia = "";
                        props.history.push("/EspacioDeTrabajo");
                    }
                } catch (e) {
                    console.log("error:" + e);
                    window.alert("Hubo un error al tratar de registrarte.");
                }
            }
            else {
                window.alert("Las contraseñas no coinciden");
            }

            props.history.goBack(); //Regresa al main
        }
        else {
            window.alert("Por favor, ingrese los datos correctamente");
        }
    }

    const formik = useFormik({
        initialValues: {
            Nombre: "",
            Apellido: "",
            Email: "",
            Telefono: "",
            Contrasena: "",
            ConfirmarContra: "",
        },
        onSubmit: (values) => {
            guardar(values);
        },
    });

    return (

        <div>
            <div className="container mt-5">
                <h1>Registrarse</h1>
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src={registr} alt="" className="img-fluid mb-3 d-none d-md-block" />
                        <br />
                        <h1> ¡Crea tu cuenta con nosotras ya!</h1>
                    </div>

                    <div className="col-md-7 col-lg-6 ml-auto">

                        <form action="#" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">

                                            <i className="bi bi-person-fill"></i>
                                        </span>
                                    </div>
                                    <input
                                        id="Nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        className="form-control bg-white border-left-0 border-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.Nombre}
                                    />
                                </div>

                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="bi bi-person-fill"></i>
                                        </span>
                                    </div>
                                    <input
                                        id="Apellido"
                                        type="text"
                                        placeholder="Apellido"
                                        className="form-control bg-white border-left-0 border-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.Apellido} />
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="bi bi-envelope-fill"></i> </span>
                                    </div>
                                    <input
                                        id="Email"
                                        type="email"
                                        placeholder="Email"
                                        className="form-control bg-white border-left-0 border-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.Email} />
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="bi bi-telephone-fill"></i>
                                        </span>
                                    </div>

                                    <select
                                        id="Codigo"
                                        style={{ maxWidth: " 80px" }}
                                        className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted"
                                        onChange={formik.handleChange}
                                        value={formik.values.Codigo}
                                    >
                                        <option value="+504">+504</option>
                                        <option value="+001">+001</option>
                                    </select>

                                    <input
                                        id="Telefono"
                                        type="tel"
                                        placeholder="Numero de Telefono"
                                        className="form-control bg-white border-md border-left-0 pl-3"
                                        onChange={formik.handleChange}
                                        value={formik.values.Telefono}
                                    />
                                </div>

                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <i className="bi bi-file-lock2-fill"></i>
                                        </span>
                                    </div>
                                    <input
                                        id="Contrasena"
                                        type="password"
                                        placeholder="Contraseña"
                                        className="form-control bg-white border-left-0 border-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.Contrasena}
                                    />
                                </div>

                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-1 border-md border-right-0">
                                            <i className="bi bi-file-lock2-fill"></i>
                                        </span>
                                    </div>
                                    <input
                                        id="ConfirmarContra"
                                        type="password"
                                        placeholder="Confirmar Contraseña"
                                        className="form-control bg-white border-left-0 border-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.ConfirmarContra}
                                    />
                                </div>


                                <div className="col-lg col-md">
                                    <input type="submit" value="Enviar" className="btn p-auto btn-primary form-control" ></input>
                                </div>

                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold">Ya tienes una cuenta?
                                        <a href="/IniciarSesion" className="text-primary ml-2">Inicia Sesion</a></p>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <footer className="w-1000  d-flex  align-items-center justify-content-center flex-wrap">
                <p className="fs-5 px-3  pt-3">Proyecto grupo 2&copy; Todos Los Derechos Reservados 2021</p>
                <div id="iconos" >
                    <a href="#."><i className="bi bi-facebook"></i></a>
                    <a href="#."><i className="bi bi-twitter"></i></a>
                    <a href="#."><i className="bi bi-instagram"></i></a>
                </div>
            </footer>
        </div>
    );
}

export default Registrarse;