const express = require('express');

const expressConfig = require('./config/expressConfig.js')
const handlebarsConfig = require('./config/handlebarsConfig.js');
const dbConnect = require('./config/dbConfig.js');
const routes = require('./routes.js');

const app = express();

const PORT = 5000;

dbConnect()
    .then(() => console.log('DB Connected successfully'))
    .catch(err => console.log('DB error: ', err));

expressConfig(app)
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
