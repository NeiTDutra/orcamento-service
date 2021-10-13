const axios = require('axios');
const url = 'http://localhost:7575/enotafiscal/api/v1/rps';


exports.rps_list = (req, res, next) => {

    (async () => {
        try {

            const response = await axios.get(url);

            res.render('./enotafiscal/rps_index',
                {
                    title: 'Todas RPSs',
                    rps_list: response.data.message
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_detail = (req, res, next) => {

    (async () => {
        try {

            const response = await axios.get(url, req.params.id);

            res.render('./enotafiscal/rps_detail',
                {
                    title: 'Detalhe de RPSs',
                    rps_list: response.data.message
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_create_get = (req, res, next) => {

    (async () => {
        try {

            const response = await axios.get(url);
            const num = response.data.message

            for (let re in num) {

                if (undefined === re.numero) {

                    var n = 1;
                }
                else if (re.numero > anteriorN) {
                    var n = parseInt(re.numero) + 1;
                }
                var anteriorN = re.numero;

            }

            var datetime = new Date();
            res.render('./enotafiscal/rps_form',
                {
                    title: 'Nova RPS',
                    numero: n,
                    data: datetime
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_create_post = (req, res, next) => {


    orcamento.save(function (err) {

        if (err) { return next(err); }

        res.redirect(orcamento.url);
    });
};

exports.rps_update_get = (req, res, next) => {

    Orcamento.findById(req.params.id, function (err, orcamento) {

        if (err) { return next(err); }

        if (orcamento == null) {

            var err = new Error('Orçamento not found');
            err.status = 404;
            return next(err);
        }
        res.render('./orcamento/orcamento_form',
            {
                title: 'Orçamento',
                orcamento: orcamento,
                csrfToken: req.csrfToken()
            });
    });
};

exports.rps_update_post = (req, res, next) => {

    let now = new Date();
    let dia = now.getDate();
    let mes = now.getMonth() + 1;
    let ano = now.getFullYear();
    var ultima = dia + '/' + mes + '/' + ano;
    var data = req.body.data.substr(0, 10).split('-').reverse().join('/');
    var orcamento =
    {
        numero: req.body.numero,
        data: data,
        ultima_atualizacao: ultima,
        situacao: req.body.situacao,
        empresa: [
            {
                nome: req.body.empresa_nome,
                cnpj: req.body.empresa_cnpj,
                fone: req.body.empresa_fone
            },
        ],
        cliente: [
            {
                nome: req.body.cliente_nome,
                rua: req.body.cliente_rua,
                numero: req.body.cliente_numero,
                cidade: req.body.cliente_cidade,
                email: req.body.cliente_email,
                fone: req.body.cliente_fone
            },
        ],
        servico: [
            {
                quantidade: req.body.servico_quantidade,
                descricao: req.body.servico_descricao,
                v_unitario: req.body.servico_v_unitario,
                v_total: req.body.servico_v_total
            },
        ],
        material: [
            {
                quantidade: req.body.material_quantidade,
                descricao: req.body.material_descricao,
                v_unitario: req.body.material_v_unitario,
                v_total: req.body.material_v_total
            },
        ],
        v_t_servico: req.body.v_t_servico,
        v_t_material: req.body.v_t_material,
        v_t_orcamento: req.body.v_t_orcamento,
        obs: req.body.obs,
        recibo: [
            {
                local_data: req.body.local_data,
                nome_cliente: req.body.nome_cliente,
                valor: req.body.valor,
                valor_escrito: req.body.valor_escrito,
                emitente: req.body.emitente,
                cpf: req.body.cpf_recibo,
                cnpj: req.body.cnpj_recibo
            }
        ]
    };

    Orcamento.findByIdAndUpdate(req.params.id, orcamento, {}, function (err, orcamento) {

        if (err) { return next(err); }

        res.redirect(orcamento.url);
    });
};

exports.rps_delete_post = (req, res, next) => {

    Orcamento.findByIdAndRemove(req.body.orcamento_id, function (err) {

        if (err) { return next(err); }

        res.redirect('/orcamentos/orcamentos');
    });
};
