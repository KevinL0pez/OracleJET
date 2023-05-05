define(['accUtils', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojrouter', 'ojs/ojformlayout', 'ojs/ojbutton'],
function(accUtils, ko, $, ArrayDataProvider, Router, ojFormLayout) {
  
  function FormulariosViewModel() {
    var self = this;
    const url = 'http://localhost:3000';
    const DATOS_DIFUNTO = {
      primerApellido: '',
      segundoApellido: '',
      nombres: '',
      sexo: '',
      fechaNacimiento: '',
      estadoCivil: '',
      ocupacion: '',
      paisResidencia: '',
      departamentoResidencia: '',
      municipioResidencia: '',
      divisionMunicipal: '',
      direccion: '',
      numeroIdentificacion: '',
      nacionalidadFamiliar: '',
      nomapellfamiliar: '',
      estratoEconomico: ''
    }
    self.listaGeneros = ko.observable();
    self.listaPaises = ko.observable();
    self.listaDepartamentos = ko.observable();
    self.listaCiudades = ko.observable();
    self.listaDivisionMunicipal = ko.observable();
    self.listaEstadoCivil = ko.observable();
    self.listaEstratoSocial = ko.observable();

    self.connected = async function() {
      accUtils.announce('Home page loaded.', 'assertive');
      document.title = "Home";
      console.log("Cargando...");
      await self.cargarGenero();
      await self.cargarPaises();
      await self.cargarEstadoCivil();
      await self.cargarEstratoSocial();
      console.log("Finalizado.");
    };

    self.cargarGenero = async function() {
      try {
        const respuesta = await fetch(`${url}/genero`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaGeneros(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarPaises = async function() {
      try {
        const respuesta = await fetch(`${url}/paises`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaPaises(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarEstadoCivil = async function() {
      try {
        const respuesta = await fetch(`${url}/estadoCivil`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaEstadoCivil(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };
    
    self.cargarEstratoSocial = async function() {
      try {
        const respuesta = await fetch(`${url}/estrato`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaEstratoSocial(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarDepartamentos = async function (event) {
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['paisResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/departamentos?idPais=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaDepartamentos(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.cargarCiudades = async function (event) {
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['departamentoResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/ciudades?idDepartamento=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaCiudades(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.cargarDivisionMunicipal = async function (event) {
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['municipioResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/divisionMunicipal?idCiudad=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaDivisionMunicipal(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.crearDatos = async function () {
      try {
        const respuesta = await fetch(`${url}/registrarInformacion`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(DATOS_DIFUNTO)
        });
        const datos = await respuesta.json();
        console.log(datos);
      } catch (error) {
        
      }
    }

    self.setValores = function (event) {
      var valor = event.detail.value;
      console.log(valor); 
      var elemento = event.target.id;
      DATOS_DIFUNTO[elemento] = valor;
    }

    self.disconnected = function() {
      // Implement if needed
    };

    self.transitionCompleted = function() {
      // Implement if needed
    };

  }

  return FormulariosViewModel;
  }
);