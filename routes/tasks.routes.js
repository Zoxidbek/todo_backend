const {Router} = require('express')
const {getAllTasks , getOneTask, addTask, updateTask, deleteTask } = require('../controller/tasks')
const checkAdmin = require('../middleware/adminchecker')


const todoRouter = Router()


todoRouter.get('/get_all_tasks', getAllTasks)
todoRouter.get('/get_one_task/:id', getOneTask)
todoRouter.post('/add_task', checkAdmin,addTask)
todoRouter.put('/update_task/:id', checkAdmin, updateTask)
todoRouter.delete('/delete_task/:id', checkAdmin,deleteTask)

module.exports = todoRouter
