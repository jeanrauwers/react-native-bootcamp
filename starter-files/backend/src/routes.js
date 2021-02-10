const express = require('express')
const verifyToken = require('./config/verifyToken')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
// const uploadToS3 = require('./config/s3Upload');  removing s3Upload support
const uploadConfig = require('./config/upload')
const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/api/status', (req, res) => {
	res.send({ status: 200 })
})

//Registration
routes.post('/api/registration/:eventId', verifyToken, RegistrationController.create)
routes.get('/api/registration', verifyToken, RegistrationController.getMyRegistrations)
routes.get('/api/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/api/registration/:registration_id/approvals', verifyToken, ApprovalController.approval)
routes.post('/api/registration/:registration_id/rejections', verifyToken, RejectionController.rejection)

//Login
routes.post('/api/login', LoginController.store)

//Dashboard
routes.get('/api/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/api/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/api/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/api/event/:eventId', verifyToken, DashboardController.getEventById)

//Events 
// routes.post('/api/event', verifyToken, uploadToS3.single('thumbnail'), EventController.createEvent) removes s3 support
routes.post('/api/event', verifyToken, upload.single('thumbnail'), EventController.createEvent)
routes.delete('/api/event/:eventId', verifyToken, EventController.delete)

//User
routes.post('/api/user/register', UserController.createUser)
routes.get('/api/user/:userId', UserController.getUserById)

module.exports = routes