const Event = require('../models/Event')
const jwt = require('jsonwebtoken')

module.exports = {
	getEventById(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { eventId } = req.params
				try {
					const event = await Event.findById(eventId)
					if (event) {
						console.log('🚀 ------------------------------------------------------------------------')
						console.log('🚀 ~ file: DashboardController.js ~ line 34 ~ jwt.verify ~ events', event)
						console.log('🚀 ------------------------------------------------------------------------')
						return res.json({ authData: authData, events: event })
					} else {
						return res.json({ message: 'EventId does not exist!' })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}

		})
	},
	getAllEvents(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { sport } = req.params
				const query = sport ? { sport } : {}

				try {
					const events = await Event.find(query)

					if (events) {
						console.log('🚀 ------------------------------------------------------------------------')
						console.log('🚀 ~ file: DashboardController.js ~ line 34 ~ jwt.verify ~ events', events)
						console.log('🚀 ------------------------------------------------------------------------')
						return res.json({ authData, events })
					} else {
						return res.json({ message: 'We do have any events yet' })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}

			}
		})
	},

	getEventsByUserId(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {

				const { user_id } = req.headers

				try {
					const events = await Event.find({ user: authData.user._id })

					if (events) {
						return res.json({ authData, events })
					} else {
						return res.status(400).json({ message: `We do have any events with the user_id ${user_id}` })
					}
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})
	}
}