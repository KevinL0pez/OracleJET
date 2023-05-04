const express = require("express");
const oracledb = require("oracledb");

const app = express();
const port = process.env.PORT || 3000;

// Connection string
const connectString = "myconnectionstring";

// Establishing connection
oracledb.getConnection(
  {
    user: "myusername",
    password: "mypassword",
    connectString: connectString,
  },
  (err, connection) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to Oracle Database");

    // Adding the connection object to app.locals to be used in other files
    app.locals.connection = connection;
  }
);

// Importing and using routes
const paisRoutes = require("./routes/paisRoutes");
app.use("/paises", paisRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});