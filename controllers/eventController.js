const Event = require('../models/Event');

// handle errors
const handleErrors = (err) => {
  console.log(err.message);
  const errors = {
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petAllowed: '',
    organizer: '',
  };

  // validation errors
  if (err.message.includes('event validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// listAction, detailAction, createAction, updateAction and deleteAction

const listAction = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    const events = await Event.paginate({}, options);
    res.status(201).json(events);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
};

const detailAction = (req, res) => {
  Event.findById({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).send({ error: err.message });
    });
};

const createAction = async (req, res) => {
  const {
    category,
    title,
    description,
    location,
    date,
    time,
    petAllowed,
    organizer,
  } = req.body;

  try {
    const event = await Event.create({
      category,
      title,
      description,
      location,
      date,
      time,
      petAllowed,
      organizer,
    });
    res.status(201).json(event);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const updateAction = (req, res) => {
  Event.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Event.findOne({ _id: req.params.id })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(422).send({ error: err.message });
        });
    });
};

const deleteAction = (req, res) => {
  Event.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).send({ error: err.message });
    });
};

module.exports = {
  listAction,
  detailAction,
  createAction,
  updateAction,
  deleteAction,
};
