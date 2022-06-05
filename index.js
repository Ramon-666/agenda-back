const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

// Configuracion de Rutas
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
const app = express()

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.anumbr7.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
             
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
app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)
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