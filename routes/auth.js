const router = require('express').Router()
const User =  require('../models/User')
const Joi = require('@hapi/joi')
//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    telephone: Joi.string().min(6).max(1024),
})

router.post('/register', async (req, res) => {
try{
    //Validar el Usuario
    const { error } =  schemaRegister.validate(req.body)

    if(error){
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    //Validamos Correo Unico
    const isEmailExist = await User.findOne({
        email: req.body.email
    })

    if( isEmailExist ){
        return res.status(400).json(
            {error: 'Correo ya existe'}
        )
    }

    const isPhonelExist = await User.findOne({
        email: req.body.telephone
    })

    if( isPhonelExist ){
        return res.status(400).json(
            {error: 'Telefono ya existe'}
        )
    }

    //Hash de la Contraseña
    //const salt = await bcrypt.genSalt(10)
    //const password =  await bcrypt.hash(req.body.password, salt)

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telephone: req.body.telephone
    })

    try{
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    }catch (error) {
        console.log(error)
        //res.status(400).json({error})    
    }
}catch (error){
    console.log(error)
}
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
})

router.post('/login', async(req, res) => {
    try{
    const { error } = schemaLogin.validate(req.body)
    if (error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const user = await User.findOne({
        email: req.body.email
    })

    if ( !user ){
        return res.status(400).json({
            error: 'Usuario no Encontrado'
        })
    }

    //const validPassword = await bcrypt.compare(req.body.password, user.password)
    if ( req.body.password != user.password ){
        return res.status(400).json({
            error: 'Password Incorrecto'
        })
    }

    //Creacion del token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

 
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
}catch (error) {
    console.log(error)
}
})

module.exports = router