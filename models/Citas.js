const { date } = require('@hapi/joi/lib/template')
const mongoose = require('mongoose')

const citaSchema = new mongoose.Schema({
    name_contact: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    issue: {
        type: String,
        max: 1024
    },
    date: {
        type: date,
        required: true
        
    }
})

module.exports = mongoose.model('Cita', citaSchema)