const jsonServer = require("json-server");
const server = create();
const router = _router("db.json");
const middleWare = defaults();


server.use(middleWare);
server.use(router);
server.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is running!");
});