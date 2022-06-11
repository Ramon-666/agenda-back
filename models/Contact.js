import mongoose from 'mongoose'
import User from mongoose.model('User')

const contactSchema = new Schema({
    idUser: {
        type: Schema.ObjectId, 
        ref: User
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    telephone: {
        type: String,
        min: 10,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contact', contactSchema)