const Orcamento = require('../models/orcamento');
const async = require('async');


exports.index = (req, res, next) => {

    async.parallel({

        orcamento_count: (callback) => {
            Orcamento.countDocuments(callback);
        },
        orcamento_sit_abe: (callback) => {
            Orcamento.countDocuments({situacao:'aberto'}, callback);
        },
        orcamento_sit_arq: (callback) => {
            Orcamento.countDocuments({situacao:'arquivado'}, callback);
        }, 
    }, function (err, results) {

            if(err) { return next(err); }

            res.render('./orcamento/orcamento_index_initial',
                { 
                    title: 'Estatísticas', 
                    data: results 
                });
    });
};

exports.orcamento_list = (req, res, next) => {

    if(req.query.nome) {

        let nome = req.query.nome;
        Orcamento.find({ '$and': [{'cliente.nome':{'$regex': `^${nome}.*`, '$options': 'i'}}]}).exec( (err, list_orc_seg) => {

            if(err) { return next(err); }
    
            res.render('./orcamento/orcamento_list',
                { 
                    title: 'Busca por nome', 
                    orcamento_list: list_orc_seg 
                });
        });
    }
    else if (req.query.situacao) {

        let sit = req.query.situacao;
        Orcamento.find({situacao: sit}).exec( (err, list_orc_sit) => {

            if(err) { return next(err); }

            res.render('./orcamento/orcamento_list',
                { 
                    title: 'Situação "'+sit+'"', 
                    orcamento_list: list_orc_sit 
                });
        });
    }
    else if (req.query.modo) {

        let mes = req.query.modo === 'ultima_atualizacao'
            && req.query.mes < 10 
            ? req.query.mes.slice(1) 
            : req.query.mes;
        let dia = req.query.modo === 'ultima_atualizacao'
            && req.query.dia < 10
            ? req.query.dia.slice(1)
            : req.query.dia;
        let ano = req.query.ano;
        let campo = req.query.modo;
        let busca = req.query.modo === 'ultima_atualizacao' ? 'Última atualização' : "Data";
        
        diaT = dia != 0 || !undefined===dia ? +dia : '.*';
        mesT = mes != 0 ? mes : '.*';
        anoT = ano != 0 || !undefined===ano ? ano : '.*';

        let regT = diaT+'/'+mesT+'/'+anoT;
        
        Orcamento.find({ '$and': [{[campo]:{'$regex': regT}}]}).sort({numero: - 1}).exec( (err, list_orc_sit) => {

            if(err) { return next(err); }

            res.render('./orcamento/orcamento_list',
                { 
                    title: 'Busca por: "'+busca+'" - Data: "'+regT+'"', 
                    orcamento_list: list_orc_sit 
                });
        });
    }
    else {

        Orcamento.find({}).sort({numero: -1}).exec( (err, list_orc) => {

            if(err) { return next(err); }
            
            res.render('./orcamento/orcamento_list',
                { 
                    title: 'Todos orçamentos', 
                    orcamento_list: list_orc 
                });
        });
    }
};

exports.orcamento_detail = (req, res, next) => {

    Orcamento.findById(req.params.id).exec( (err, detail_orc) => {

        if(err) { return next(err); }

        res.render('./orcamento/orcamento_detail',
            { 
                title: 'Detalhe do orçamento', 
                orcamento_detail: detail_orc, 
                csrfToken: req.csrfToken() 
            });
    });
};

exports.orcamento_create_get = (req, res, next) => {

    Orcamento.find().sort({numero:-1}).exec( (err, num) => {

        if(err) { return next(err); }

        if(undefined===num[0]) {
            
            var n = 1;
        }
        else {
        
            var n = num[0].numero + 1;
        }
        
        res.render('./orcamento/orcamento_form',
            { 
                title: 'Novo orçamento', 
                numero: n, 
                csrfToken: req.csrfToken() 
            });

    });
};

exports.orcamento_create_post = (req, res, next) => {
    
    let now = new Date();
    let dia = now.getDate();
    let mes = now.getMonth() + 1;
    let ano = now.getFullYear();
    var ultima = dia+'/'+mes+'/'+ano;
    var data = req.body.data.substr(0,10).split('-').reverse().join('/');
    var orcamento = new Orcamento(
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
        obs: req.body.obs
        }
    );
    orcamento.save( function (err) {

        if(err) { return next(err); }

        res.redirect(orcamento.url);
    });
};

exports.orcamento_update_get = (req, res, next) => {

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

exports.orcamento_update_post = (req, res, next) => {

    let now = new Date();
    let dia = now.getDate();
    let mes = now.getMonth() + 1;
    let ano = now.getFullYear();
    var ultima = dia +'/'+ mes +'/'+ ano;
    var data = req.body.data.substr(0,10).split('-').reverse().join('/');
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
        obs: req.body.obs
        };

    Orcamento.findByIdAndUpdate(req.params.id, orcamento, {}, function (err, orcamento) {

        if(err) { return next(err); }

        res.redirect(orcamento.url);
    });
};

exports.orcamento_delete_post = (req, res, next) => {

    Orcamento.findByIdAndRemove(req.body.orcamento_id, function (err) {

        if (err) { return next(err); }
        
        res.redirect('/orcamentos/orcamentos');
    });
};