const express = require('express')
const app = express()
app.use(express.json())

const kamarController =
require('../controller/kamar-controller')
app.get("/getAll", kamarController.getAllKamar)
app.post("/add", kamarController.addKamar)
app.get("/find", kamarController.findKamar)
app.put("/:id/update", kamarController.updateKamar)
app.delete("/:id/delete", kamarController.deleteKamar)
module.exports = app