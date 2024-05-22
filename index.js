const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("Json/db.json");
const middelWare = jsonServer.defaults();
const port = process.env.PORT || 8000;


server.use(middelWare);
server.use(router);
server.listen(port);