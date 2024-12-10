const express = require("express");
const cors = require('cors');
const db = require("./models/ConnectDatabase");
const routes = require("./routes");
const app = express();
const port = 2057;

db.testConnection().catch((err) => {
  console.error(
    "Não foi possível conectar ao banco de dados. Encerrando o aplicativo."
  );
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});

