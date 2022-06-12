const routerCont = require('express').Router()

//Importamos el modelo de las notas que creamos
const contacto = require('../models/Contact')

// Agregar una nueva Nota usamos POST
routerCont.post('/nuevo-contacto', async(req, res) => {
    const body = req.body
    console.log(req, body)
    try{
     const contactDB = await contacto.create(body)
     res.status(200).json(contactDB)
    }catch (error){
     return res.status(500).json({
        mensaje: 'ocurrio un error',
        error
     })
  }
})

routerCont.get('/contacto/:id', async(req, res) => {
    const _id = req.params.id
    try {
       const contactDB = await contacto.findOne({_id})
       res.json(contactDB)
    } catch (error) {
       return res.status(400).json({
          mensaje: "no se encontro la nota con ese id",
          error
       })
    }
 })
 
 routerCont.get('/contacto', async(req, res) => {
    try {
       const contactDB = await contacto.find()
       res.json(contactDB)
    } catch (error) {
       return res.status(400).json({
          mensaje: "no se encontraron",
          error
       }) 
    }
 })
 
 routerCont.delete('/contacto/:id', async(req, res) =>{
    const _id = req.params.id
    try {
       const contactDB = await contacto.findByIdAndDelete({_id})
       if(!contactDB){
          return res.status(400).json({
             mensaje: 'no se pudo encontra el ID',
             error
          })
       }
       res.json(contactDB)
    } catch (error) {
       return  res.status(400).json({
          mensaje: 'no se puede borrar',
          error
       })
    }
 })
 
 routerCont.put('/contacto/:id', async(req, res) =>{
    const _id = req.params.id
    const body = req.body
    try {
       const contactDB = await contacto.findByIdAndUpdate(
          _id,
          body,
          {new: true}
       )
       res.json(contactDB)
       
    } catch (error) {
       return  res.status(400).json({
          mensaje: 'no se puede actualizar',
          error
       })
    }
 })
 module.exports = routerCont