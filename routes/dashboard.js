const router = require('express').Router()
const Contact = require('../models/Contact')

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'Ruta Protegida',
            user: req.user
        }
    })
})

//Agregado recientemente
const schemaNewContact = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    telephone: Joi.string().min(6).max(1024),
})
router.get('/contacts', async (req, res) => {
    try{
        const { error } =  schemaNewContact.validate(req.body)

        if(error){
            return res.status(400).json(
                {error: error.details[0].message}
            )
        }
        const contact = new Contact ({
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone
        })

        try{
            const savedContact = await contact.save()
            res.json({
                error: null,
                data: savedContact
            })
        } catch(error) {
            console.log(error)
        }
    } catch(error) {
        console.log(error)
    }
})

module.exports = router