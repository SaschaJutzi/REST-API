const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRouter = require('./routes/eventRoutes');
const dbURI = require('./connstring');

// set up express app
const app = express();

// connect to mongodb and listen for requests
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(process.env.port || 3000))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// handle cross-origin requests
app.use(cors());

// initialize routes
app.use('/api', eventRouter);
