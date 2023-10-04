const express = require('express');

const expressConfig = require('./config/expressConfig.js')
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./routes.js');

const app = express();

const PORT = 5000;

expressConfig(app)
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
