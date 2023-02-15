const express = require(`express`) /** load library express */
const app = express() /** create object that instances of express */ 
const PORT = 8000 /** define port of server */ 

//ini cors
const cors = require(`cors`) /** load library cors */ 
app.use(cors()) /** open CORS policy */

//ini body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/** define all routes */
const userRoute = require("./routes/user_route") 
const tipeKamarRoute = require("./routes/tipe_kamar-route") 
const pemesananRoute = require("./routes/pemesanan.route") 
const kamarRoute = require("./routes/kamar-route") 
const detailPemesananRoute = require("./routes/detail_pemesanan-route") 

/** define prefix for each route */ 
app.use('/user', userRoute)
app.use('/tipeKamar', tipeKamarRoute)
app.use('/pemesanan', pemesananRoute)
app.use('/kamar', kamarRoute)
app.use('/detailPemesanan', detailPemesananRoute)


/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of hotel runs on port${PORT}`)
    })