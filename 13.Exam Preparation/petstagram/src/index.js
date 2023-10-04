const express = require('express');

const routes = require('./routes');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');

const app = express();

const PORT = 3000;

dbConnect()
    .then(() => console.log('DB connected successfully!'))
    .catch(err => console.log('DB error: ', err));

expressConfig(app);
handlebarsConfig(app);
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));