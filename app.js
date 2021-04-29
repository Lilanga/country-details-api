const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./models');

const app = express();
const winstonLogger = require('./config/winston.config');

app.use(morgan('combined', { stream: winstonLogger.stream }));
app.use(bodyParser.json());

app.get('/', (req, resp) => {
  resp.json({ message: 'Welcome to the API' });
});

const PORT = process.env.PORT || 4000;

// syncronize with db
db.sequelize.sync();

require('./routes/index.routes')(app);

app.listen(PORT, () => {
  winstonLogger.info(`Server is listning on port ${PORT}.`);
});
