const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const oracledb = require("oracledb");
const messages = require("../constant/messages");
const variables = require("../constant/variables");

// Configuración de Express
app.use(cors());
app.use(express.json());

async function run() {
  let connection;

  try {
    
    connection = await oracledb.getConnection({
      user: variables.USER,
      password: variables.PASSWORD,
      connectString: variables.CONNECTSTRING,
    });
    console.log("Conectado a Base de datos de Oracle.");

    // Rutas de tu microservicio
    app.get("/", (req, res) => {
      res.send("¡Microservicio funcionando!");
    });

    // app.get("/navegadores", (req, res) => {
    //   const navegadores = [
    //     { value: "IE", label: "Internet Explorer" },
    //     { value: "FF", label: "Firefox" },
    //     { value: "CH", label: "Chrome" },
    //     { value: "OP", label: "Opera" },
    //     { value: "SA", label: "Safari" },
    //   ];
    //   res.send(navegadores);
    //   res.status(200).send("OK");
    // });

    const getPaises = async () => {
      try {
        const result = await connection.execute("SELECT REFERENCIA_PAIS, NOMBRE_PAIS FROM PAIS");
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener los países");
      }
    };
    
    app.get("/paises", async (req, res) => {
      try {
        const resultadosFormateados = await getPaises();
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });
    // do something with the connection

    const getDepartamentos = async (idPais) => {
      try {
        const result = await connection.execute(
          `SELECT DEPARTAMENTO_PK, NOMBRE_DEPARTAMENTO FROM DEPARTAMENTO d WHERE d.PAIS_FK = ${idPais}`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener los departamentos");
      }
    };

    app.get("/departamentos", async (req, res) => {
      // var idPais = req.params.idPais;
      var idPais = req.query.idPais;
      try {
        const resultadosFormateados = await getDepartamentos(idPais);
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });

    const getCiudades = async (idDepartamento) => {
      try {
        const result = await connection.execute(
          `SELECT CIUDAD_PK, NOMBRE_CIUDAD FROM CIUDAD c WHERE c.DEPARTAMENTO_FK = ${idDepartamento}`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener las ciudades");
      }
    };

    app.get("/ciudades", async (req, res) => {
      // var idPais = req.params.idPais;
      var idDepartamento = req.query.idDepartamento;
      try {
        const resultadosFormateados = await getCiudades(idDepartamento);
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });

    const getDivisionMunicipal = async (idCiudad) => {
      try {
        const result = await connection.execute(
          `SELECT DIVISION_PK , NOMBRE_DIVISION, DESCRIPCION FROM DIVISION_MUNICIPAL dm WHERE dm.CIUDAD_FK = ${idCiudad}`
        );
        const resultadosFormateados = result.rows.map(([value, division, descripcion]) => ({ value, label: `${division}: ${descripcion}` }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/divisionMunicipal", async (req, res) => {
      // var idPais = req.params.idPais;
      var idCiudad = req.query.idCiudad;
      try {
        const resultadosFormateados = await getDivisionMunicipal(idCiudad);
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });
    
    const getEstadoCivil = async () => {
      try {
        const result = await connection.execute(
          `SELECT ESTADOS_CIVIL_PK, NOMBRE_ESTADO FROM ESTADO_CIVIL ORDER BY NOMBRE_ESTADO ASC`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/estadoCivil", async (req, res) => {
      try {
        const resultadosFormateados = await getEstadoCivil();
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });

    const getEstrato = async () => {
      try {
        const result = await connection.execute(
          `SELECT ESTRATO, NOMBRE_ESTRATO  FROM ESTRATOS_SOCIOECONOMICOS ORDER BY ESTRATO ASC`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label: `${value} ${label}` }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/estrato", async (req, res) => {
      try {
        const resultadosFormateados = await getEstrato();
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });

    const getGenero = async () => {
      try {
        const result = await connection.execute(
          `SELECT ABREVIATURA, NOMBRE_GENERO FROM GENERO`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/genero", async (req, res) => {
      try {
        const resultadosFormateados = await getGenero();
        res.status(200).json({
          code: 0,
          data: resultadosFormateados,
          messages: [messages.SUCCES],
          success: true,
          status: 200
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 1,
          data: {},
          messages: [messages.ERROR],
          success: false,
          status: 500
        });
      }
    });

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        
        // await connection.close();
        // console.log("Connection closed");
      } catch (err) {
        await connection.close();
        console.log("Connection closed");
        console.error(err);
      }
    }
  }
}

run();

// Iniciar la aplicación
app.listen(port, () => {
  console.log(
    `El microservicio está corriendo en el puerto http://localhost:${port}`
  );
});