//imports Mongoose
const mongoose = require('mongoose');

//tells mongoose which DB to connect to
mongoose.connect('mongodb://localhost:27017/social-network-API', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed
mongoose.set('debug', true);