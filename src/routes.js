//const { Router } = require("express"); // importando apenas a parte de roteamento

import { Router } from "express"; // possível com Sucrase

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: "Hello World!" })
})

// module.exports = routes;
export default routes;