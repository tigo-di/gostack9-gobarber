const { Router } = require("express"); // importando apenas a parte de roteamento

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: "Hello World" })
})

module.exports = routes;