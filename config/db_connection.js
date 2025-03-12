const mongoose = require('mongoose');
const util = require('util');

const mongoDB = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then (() => {
    const db = mongoose.connection;

    // Nome do banco de dados
    console.log(`Banco de dados conectado: ${db.name}`);

    // Listar coleções (tabelas)
    db.db.listCollections().toArray()
        .then(collections => {
            console.log('Coleções disponíveis:', collections.map(c => c.name));
        })
        .catch(err => console.error('Erro ao listar coleções:', err));

    // Obter usuário e senha da URI
    const url = new URL(mongoDB);
    console.log(`Usuário: ${url.username}`);
    console.log(`Senha: ${url.password ? '****' : 'Não definida'}`);
})
.catch ((error) => {
    console.log('MongoDB connection error: '+error);
    process.exit(1);
});
