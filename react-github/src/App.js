import React from 'react'
import EspacioDeTrabajo from './Registros/EspacioDeTrabajo';
import { FormEditar } from './Registros/FormEditar';
import Inicio from './Inicio/Inicio'
import TablaMovimientos from './Registros/TablaMovimientos';
import Registrarse from './Registrarse/Registrarse';
import Iniciosesion from './Iniciosesion/Iniciosesion';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

const App = () => {

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand " to="/">Proyecto G2</Link>
                <button className="navbar-toggler"
                    type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Inicio</Link>
                        <Link className="nav-link" to="/EspacioDeTrabajo">Espacio de trabajo</Link>
                        <Link className="nav-link" to="/Movimientos">Movimientos</Link>
                    </div>
                    <div className="navbar-nav ml-auto ">
                        <Link className="nav-link" to="/Registrarse">Registrarse</Link>
                        <Link className="nav-link" to="/IniciarSesion">Iniciar sesion</Link>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route exact path="/" component={Inicio}></Route>
                <Route path="/Registrarse" component={Registrarse}></Route>
                <Route path="/IniciarSesion" component={Iniciosesion}></Route>
                <Route path="/EspacioDeTrabajo" component={EspacioDeTrabajo}></Route>
                <Route path="/FormEditar" component={FormEditar}></Route>
                <Route path="/Movimientos" component={TablaMovimientos}></Route>
            </Switch>
        </Router>
    )
}

export default App;