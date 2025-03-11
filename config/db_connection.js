const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://nservicos:Nservicos2023@cluster0.27qk0.gcp.mongodb.net/orcamento?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then (() => {
    const db = mongoose.connection;
    console.log('MongoDB connection success: \nModels: ', db.models, db.name);
})
.catch ((error) => {
    console.log('MongoDB connection error: '+error);
    process.exit();
});
