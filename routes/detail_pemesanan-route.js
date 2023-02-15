const express = require('express')
const app = express()
app.use(express.json())

const detailPemesananController =
require('../controller/detail_pemesanan-controller')
app.get("/getAll", detailPemesananController.getAllDetailPemesanan)
app.post("/add", detailPemesananController.addDetailPemesanan)
app.get("/find", detailPemesananController.findDetailPemesanan)
app.put("/:id/update", detailPemesananController.updateDetailPemesanan)
app.delete("/:id/delete", detailPemesananController.deleteDetailPemesanan)
module.exports = app