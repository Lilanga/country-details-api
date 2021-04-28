const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, resp) => {
  resp.json({ message: 'Welcome to the API' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}.`);
});
