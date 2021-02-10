const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const PORT = process.env.PORT || 8080
const app = express()
const server = http.Server(app)

const io = socketio(server)
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

try {
	mongoose.connect('mongodb://mongo:27017/docker-node-mongo', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(`mongodb Connection error - ${error}`)
}


const connectUsers = {};
io.on('connection', socket => {
	const { user } = socket.handshake.query
	connectUsers[user] = socket.id
})

app.use((req, res, next) => {
	req.io = io
	req.connectUsers = connectUsers
	return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')))
app.use(routes)

server.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
