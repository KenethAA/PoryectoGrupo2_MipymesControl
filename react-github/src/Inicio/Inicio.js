import React from 'react';
import './Inicio.css';
import slide1 from '../Inicio/img/slide1.jpg'
import estres from '../Inicio/img/estres.jpeg'
import slide2 from '../Inicio/img/slide2.jpg'
import manejo from '../Inicio/img/manejo.jpg'
import team from '../Inicio/img/team.jpg'
import seo from '../Inicio/img/seo.png'
import prueba from '../Inicio/img/prueba.jpg'
import support from '../Inicio/img/support.png'
import { useFormik } from 'formik';
import ls from 'local-storage';

function Inicio(props) {

  //Esto lo que hace es inicializar el "user" del ls en vacio, para que no de errores luego.
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

  const formik = useFormik({
    initialValues: {
      email: "",
      nombre: "",
      telefono: "",
      msj: "",
    },
    onSubmit: (values) => {
      console.log('Enviar');
      console.log(values);
      //guardar(values);
    },
  })

  return <div>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
      <div className="d-flex flex-row ">
      </div>

        <div className="carousel-item active" data-bs-intervales="3000">
          <img src={slide1} className="d-block w-100" alt="slide1" />
        </div>

        <div className="carousel-item">
          <img src={estres} className="d-block w-100" alt="slide2" />
        </div>

        <div className="carousel-item">
          <img src={slide2} className="d-block w-100" alt="slide3" />
        </div>

      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>

    <section className=" w-50 mx-auto text-center pt-5" id="intro">
      <h1 className="p-3 fs-2 border-top border-3">Proyecto Programacion<span className="text-primary"> Grupo 2</span></h1>
      <p className="p-3 fs-4"><span className="text-primary">Nombre de la app</span> es una aplicacion web pensada para las MiPymes para el correcto funcionamiento y administración de los créditos que ofrecen a sus clientes. Donde tendras acceso a todas las herramientas necesarias  para llevar de manera eficiente, clara, sencilla y ordenada todos los registros de créditos de tus clientes. </p>
    </section>

    <br /><br /><br />

    <section className="container-fluid" style={{ backgroundColor: " blanchedalmond" }}>
      <div className="row w-75 mx-auto  selvicio-fila">
        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-start my-5 icono-wrap" >
          <img src={manejo} alt="desarrollo" width="220" height="180" />
          <div>
            <h3 className="fs-5 mt-4 px-4 pb-1">Facil Manejo</h3>
            <p className="px-4">Con nosotros no necesitas tomar cursos, nuestra aplicacion es sencilla de usar y de facil manejo</p>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-start my-5 icono-wrap">
          <img src={seo} alt="desarrollo" width="220" height="180" style={{ backgroundColor: "white" }} />
          <div>
            <h3 className="fs-5 mt-4 px-4 pb-1">Herramientas</h3>
            <p className="px-4">Te ofrecemos un sin numero de herramientas necesarias para la correcta administración de tus creditos.</p>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-start my-5 icono-wrap">
          <img src={prueba} alt="desarrollo" width="220" height="180" style={{ backgroundColor: "white" }} />
          <div>
            <h3 className="fs-5 mt-4 px-4 pb-1">Prueba Gratis</h3>
            <p className="px-4">Usa nuestra prueba gratis y disfruta de la experiencia, convencete que nosotros somos la mejor opción para administrar tus creditos</p>
          </div>
        </div>
      </div>
    </section>

    <br /><br /><br /><br />



    <section>
      <div className="w-75  m-auto text-center" id="equipo">
        <h1 className="mb-5 fs-2"> Equipo pequeño con <span className="text-primary"> Resultados Grandes</span></h1>
        <p className="fs-4"> Siempre buscamos a las personas adecuadas para que trabajen con nosotros. Por eso es que nuestro equipo esta integrado por grandes profesionales que estan 100% compremeditos a brindarte un servicio de alta calidad.</p>
      </div>

      <div className="mt-5 text-center">
        <img className="img-fluid" src={team} alt="equipo" />
      </div>
      <br /><br />
      <div id="local" className="border-top border-2">
        <div className="mapa"> </div>
        <div>
          <div className="wrapper-local">
            <h2>Ubicado en San Pedro Sula, Honduras</h2>
            <p className="fs-5 text-body"> Nuestras oficinas se encuentra en SPS con el objetivo de estar cerca a nuestros clientes. Si tienes algun problema con la aplicacion, informanos estamos para servirte. ¡Somos Tu Mejor Opcion!</p>
            <section className="d-flex justify-content-start" id="numeros-local">
              <div>
                <p className="text-primary fs-5"></p>
                <p>Protegemos tu informacion</p>
              </div>
              <div>
                <p className="text-primary fs-5">100%</p>
                <p>Confiables</p>
              </div>
              <div>
                <p className="text-primary fs-5">520</p>
                <p>Usarios</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section id="seccion-contacto" className="border-bottom border-secondary border-2">
      <div id="bg-contactos">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1b2a4e" fillOpacity="1" d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      </div>

      <div className="container  border-top border-primary " style={{ maxWidth: "500px" }} id="contenedor-formulario">
        <div className="text-center mb-4" id="titulo-formulario">
          <div><img src={support} alt="" className="img-fluid ps-5" /></div>
          <h2>Contactanos</h2>
          <p className="fs-5">Estamos aqui para contestar todas tus dudas</p>
        </div>



        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          <div className="mb-3">
            <input type="input" className="form-control" id="nombre" placeholder="Gissel Sanchez"
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />

          </div>


          <div className="mb-3">
            <input type="email" className="form-control" id="telefono" placeholder="Teléfono"
              onChange={formik.handleChange}
              value={formik.values.telefono}
            />
          </div>

          <div className="mb-3">
            <textarea className="form-control" id="msj" rows="4" placeholder="Escribe tu mensaje aqui"
              onChange={formik.handleChange}
              value={formik.values.msj}
            ></textarea>
          </div>

          <div className="mb-3">
            <button type="button" className=" btn btn-primary w-100 fs-5" >Enviar Mensaje</button>
          </div>
        </form>

      </div>
    </section>
    <footer className="w-1000  d-flex  align-items-center justify-content-center flex-wrap">
                <p className="fs-5 px-3  pt-3">Proyecto grupo 2&copy; Todos Los Derechos Reservados 2021</p>
                <div id="iconos" >
                    <a href="#."><i className="bi bi-facebook"></i></a>
                    <a href="#."><i className="bi bi-twitter"></i></a>
                    <a href="#."><i className="bi bi-instagram"></i></a>
                </div>
            </footer>
  </div>

}

export default Inicio;