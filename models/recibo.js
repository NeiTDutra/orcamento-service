const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReciboSchema = new Schema (
    {
        local_data: { type: String },
        nome_cliente: { type: String },
        valor: { type: String },
        valor_escrito: { type: String },
        referente: { type: String },
        emitente: { type: String },
        cpf: { type: String },
        cnpj: { type: String }
    }
);

module.exports = mongoose.model('Recibo', ReciboSchema);
