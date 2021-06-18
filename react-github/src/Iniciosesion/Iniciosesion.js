import React from 'react';
import './Iniciosesion.css';
import { useFormik } from 'formik';
import axios from 'axios';
import ls from 'local-storage';

function Iniciosesion(props) {

    const login = async (values) => {
        try {
            let respuesta = await axios.post('https://localhost:5001/api/registros', values);
            if (respuesta && respuesta.data) {
                let Regis = {
                    IdAdmi: respuesta.data.idAdmi,
                    Nombre: respuesta.data.nombre,
                    Apellido: respuesta.data.apellido,
                    Correo: respuesta.data.correo,
                    Celular: respuesta.data.celular,
                    Contrasenia: ""
                }
                ls.set("user", Regis);
                props.history.push("/EspacioDeTrabajo");
            }
        } catch (e) {
            console.log("error" + e);
            window.alert("El correo o la contrasenia son incorrectos.");
        }
    }

    const formik = useFormik({
        initialValues: {
            Correo: "",
            Contrasenia: "",
        },
        onSubmit: (values) => {
            login(values);
        },
    });
    return (
        <div className="mt-5">
            <div className="container">
                <h1>Iniciar sesion</h1>
            </div>
            <br />
            <br />
            <div className="col-sm-12 col-lg-6 offset-lg-3">
                <div className="headit">
                    <h4 style={{ textAlign: "center" }}>Ingrese a su cuenta</h4>
                </div>
                <form action="#" onSubmit={formik.handleSubmit}>

                    <div className="input-group lg-5 mb-4" >
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="bi bi-envelope-fill"></i> </span>
                        </div>
                        <input
                            required
                            id="Correo"
                            type="email"
                            placeholder="Email"
                            className="form-control bg-white border-left-0 border-md"
                            onChange={formik.handleChange}
                            value={formik.values.Correo}
                        />
                    </div>

                    <div className="input-group lg-5 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="bi bi-file-lock2-fill"></i>
                            </span>
                        </div>
                        <input
                            required
                            id="Contrasenia"
                            type="password"
                            placeholder="Contraseña"
                            className="form-control bg-white border-left-0 border-md"
                            onChange={formik.handleChange}
                            value={formik.values.Contrasenia}
                        />
                    </div>

                    <div className="lg-5 col-md">
                        <input type="submit" value="Iniciar sesión" className="btn p-auto btn-primary form-control" ></input>
                    </div>
                    <br />
                    <div className="text-center w-100">
                        <p className="text-muted font-weight-bold">¿No tienes una cuenta?
                        <a href="/Registrarse" className="text-primary ml-2">¡Registrate!</a></p>
                    </div>

               <div className="center">
                        <a href="#." className="lg-5 fblogin social"><i className="bi bi-facebook"></i><span> Inicia sesión con Facebook</span></a>
                        <a href="#." className="lg-5 twlogin social"><i className="bi bi-twitter"></i><span> Inicia sesión con Twitter</span></a>
                        <a href="#." className=" lg-5 gplogin social"><i className="bi bi-google"></i><span> Inicia sesión con Google</span></a>
                    </div>
                </form>
            </div>
            <br/>
            <br/>
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
export default Iniciosesion;