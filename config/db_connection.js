const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then (() => {
    const db = mongoose.connection;
    console.log('MongoDB connection success: '+db);
})
.catch ((error) => {
    console.log('MongoDB connection error: '+error);
    process.exit();
});
