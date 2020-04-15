const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
// const User = require('../resources/users/user.model');

// const users = [
//   new User({ name: 'Mike', login: 'mike', password: '1111' }),
//   new User({ name: 'John', login: 'john', password: '2222' })
// ];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error'));
  db.once('open', () => {
    console.log('Connection to Db done');
    db.dropDatabase();
    // User.insertMany(users);
    cb();
  });
};

module.exports = connectToDB;
