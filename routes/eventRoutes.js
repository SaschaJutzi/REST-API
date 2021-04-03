const { Router } = require('express');
const eventController = require('../controllers/eventController');

const router = Router();

// get a list of events from the db
router.get('/events', eventController.listAction);

// add a new event to the db
router.post('/events', eventController.createAction);

// update a event in the db
router.put('/events/:id', eventController.updateAction);

// delete a event in the db
router.delete('/events/:id', eventController.deleteAction);

module.exports = router;
