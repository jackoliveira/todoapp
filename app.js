const app = require('./config/server');
const router = require('./src/routes/router');

app.use('/', router);

app.listen(3000);
