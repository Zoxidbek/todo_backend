const {Router} = require('express')
const {register , login} = require('../controller/auth')


const loginRouter = Router()


loginRouter.post('/register',register)
loginRouter.post('/login',login)


module.exports = loginRouter