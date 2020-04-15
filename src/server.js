const { PORT } = require('./common/config');
const app = require('./app');
const connectionToDB = require('./db/db.client');

connectionToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
