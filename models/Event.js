const mongoose = require('mongoose');

// create event Schema & model
const eventSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please enter a category'],
  },
  title: {
    type: String,
    required: [true, 'Please enter a title field'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description field'],
  },
  location: {
    type: String,
    required: [true, 'Please enter a location field'],
  },
  date: {
    type: String,
    required: [true, 'Please enter a date'],
  },
  time: {
    type: String,
    required: [true, 'Please enter a time'],
  },
  petsAllowed: {
    type: Boolean,
    default: true,
  },
  organizer: {
    type: String,
    required: [true, 'Please enter an organizer'],
  },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
