const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { postUser } = require('../resources/users/user.service');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error'));
  db.once('open', () => {
    console.log('Connection to DB done');
    db.dropDatabase();
    postUser({ name: 'Admin', login: 'admin', password: 'admin' });
    cb();
  });
};

module.exports = connectToDB;
