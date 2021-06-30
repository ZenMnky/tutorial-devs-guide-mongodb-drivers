require('dotenv').config();
const app = require('./app');
const { DATABASE_CONNECTION, PORT } = process.env;

const mongoose = require('mongoose');
mongoose.connect(DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', function () {
  console.log('Connected to DB');
}).on('error', (error) => {
  console.error('DB Connection error: ', error);
});

app.listen(PORT, () => {
  console.log(`Express server is listening at http://localhost:${PORT}/api`);
});
