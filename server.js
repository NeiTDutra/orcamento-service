const app = require('./app');


// server deploy
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Site listening on port %s', port);
});