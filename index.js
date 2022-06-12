const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

// Configuracion de Rutas
const contactRoutes = require('./routes/Contacts')
const citaRoutes = require('./routes/Citas')

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
const app = express()

const uri = `mongodb+srv://admin:admin@cluster0.hc2j8ks.mongodb.net/agenda_db?retryWrites=true&w=majority`
             
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
require('dotenv').config()

mongoose.connect(uri, options)
 .then( () => console.log('Conectado a la DB'))
 .catch( e => console.log('Error DB: ' + e))

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors(corsOptions))
app.use('/api/contact', contactRoutes)
app.use('/api/cita', citaRoutes)
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Esta Funcionando'
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor Trabajando en el Puerto: ${PORT}`)
})