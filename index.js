import { create, router as _router, defaults } from "json-server";
const server = create();
const router = _router("Json/db.json");
const middelWare = defaults();
const port = process.env.PORT || 8000;


server.use(middelWare);
server.use(router);
server.listen(port);