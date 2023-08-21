const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router.get('/rest/cities', dataController.getCities)
router.get('/rest/search', dataController.getSearch)
router.post('/rest/search', dataController.postSearch)
router.get('/rest/query', dataController.getQuery)
router.get('/rest/ticket', dataController.getTicket)
router.get('/rest/schedule', dataController.getSchedule)
router.get('/rest/order', dataController.getOrder)

module.exports = router
