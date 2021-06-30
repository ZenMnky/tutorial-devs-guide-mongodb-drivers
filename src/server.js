require('dotenv').config();
const { PORT } = process.env;
const app = require('./app');

app.listen(PORT, () => {
  console.log(`Express server is listening at http://localhost:${PORT}/api`);
});
