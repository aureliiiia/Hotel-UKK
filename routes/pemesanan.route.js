// const express = require(`express`)
// const app = express()
// app.use(express.json())
// const pemesananController = require(`../controller/pemesanan_controller`)
// app.get("/getAllPemesanan", pemesananController.getAllPemesanan)
// // app.post("/findPemesanan", pemesananController.findPemesanan)
// app.post("/add", pemesananController.addPemesanan)
// app.put("/update/:id", pemesananController.updatePemesanan)
// app.delete("/delete/:id", pemesananController.deletePemesanan);

// module.exports = app

const express = require(`express`)
const app = express()
app.use(express.json())
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const pemesananController = require(`../controller/pemesanan-cotroller`)

app.get("/All",  pemesananController.getAllPemesanan)
app.post("/find",  pemesananController.findPemesanan)
app.post("/add",  pemesananController.addPemesanan)
app.put("/update/:id", pemesananController.updatePemesanan)
app.delete("/delete/:id",  pemesananController.deletePemesanan)

module.exports = app