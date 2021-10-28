const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubEmpresa = new Schema (
    {
        nome: { type: String },
        cnpj: { type: String },
        fone: { type: String }
    }
);

const SubCliente = new Schema (
    {
        nome: { type: String },
        rua: { type: String },
        numero: { type: String },
        cidade: { type: String },
        email: { type: String },
        fone: { type: String }
    }
);

const SubServico = new Schema (
    {
        quantidade: { type: Array },
        descricao: { type: Array },
        v_unitario: { type: Array },
        v_total: { type: Array }
    }
);

const SubMaterial = new Schema (
    {
        quantidade: { type: Array },
        descricao: { type: Array },
        v_unitario: { type: Array },
        v_total: { type: Array }
    }
);

const SubRecibo = new Schema (
    {
        local_data: { type: String },
        nome_cliente: { type: String },
        valor: { type: String },
        valor_escrito: { type: String },
        emitente: { type: String },
        cpf: { type: String },
        cnpj: { type: String }
    }
);

const OrcamentoSchema = new Schema (
    {
        numero: { type: Number },
        data: { type: String },
        ultima_atualizacao: { type: String },
        situacao: { type:String },
        empresa: [ SubEmpresa ],
        cliente: [ SubCliente ],
        servico: [ SubServico ],
        material: [ SubMaterial ],
        recibo: [ SubRecibo ],
        v_t_servico: { type: String },
        v_t_material: { type: String },
        v_t_orcamento: { type: String },
        obs: { type: String }
    }
);

OrcamentoSchema.virtual('url').get(function () {
    return '/orcamentos/orcamento/'+this._id;
});

module.exports = mongoose.model('Orcamento', OrcamentoSchema);