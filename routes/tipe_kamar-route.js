const express = require('express')
const app = express()
app.use(express.json())

const tipeKamarController =
require('../controller/tipe_kamar.controller')
app.get("/getAlltipe", tipeKamarController.getAlltipeKamar)
app.post("/addTipe", tipeKamarController.addTipeKamar)
app.get("/findtipe", tipeKamarController.findtipeKamar)
app.put("/:id/updateTipe", tipeKamarController.updateTipeKamar)
app.delete("/:id/deleteTipe", tipeKamarController.deleteTipeKamar)
module.exports = app