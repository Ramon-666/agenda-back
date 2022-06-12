const routerCita = require('express').Router()

//Importamos el modelo de las notas que creamos
const cita = require('../models/Citas')

// Agregar una nueva Nota usamos POST
routerCita.post('/nueva-cita', async(req, res) => {
    const body = req.body
    console.log(req, body)
    try{
    const citaDB = await cita.create(body)
    res.status(200).json(citaDB)
    }catch (error){
     return res.status(500).json({
        mensaje: 'ocurrio un error',
        error
     })
  }
})

routerCita.get('/cita/:id', async(req, res) => {
    const _id = req.params.id
    try {
       const citaDB = await cita.findOne({_id})
       res.json(citaDB)
    } catch (error) {
       return res.status(400).json({
          mensaje: "no se encontro la nota con ese id",
          error
       })
    }
 })
 
 routerCita.get('/cita', async(req, res) => {
    try {
       const citaDB = await cita.find()
       res.json(citaDB)
    } catch (error) {
       return res.status(400).json({
          mensaje: "no se encontraron",
          error
       }) 
    }
 })
 
 routerCita.delete('/cita/:id', async(req, res) =>{
    const _id = req.params.id
    try {
       const citaDB = await cita.findByIdAndDelete({_id})
       if(!citaDB){
          return res.status(400).json({
             mensaje: 'no se pudo encontra el ID',
             error
          })
       }
       res.json(citaDB)
    } catch (error) {

       return  res.status(400).json({
          mensaje: 'no se puede borrar',
          error: error
       })
    }
 })
 
 routerCita.put('/cita/:id', async(req, res) =>{
    const _id = req.params.id
    const body = req.body
    try {
       const citaDB = await cita.findByIdAndUpdate(
          _id,
          body,
          {new: true}
       )
       res.json(citaDB)
       
    } catch (error) {
       return  res.status(400).json({
          mensaje: 'no se puede actualizar',
          error
       })
    }
 })
 module.exports = routerCita