const { Router } = require("express"); // importando apenas a parte de roteamento

const routes = new Router();

routes.get('/', (res, req) => {
    return res.json({ message: "Hello World" })
})

module.exports = routes;