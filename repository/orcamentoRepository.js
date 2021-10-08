const Orcamento = require('../models/orcamento');
const async = require('async');


exports.orcamentoStatistics = (req, res, next) => {
    
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
    }, function (err, call) {

        if(err) { return next(err); }

        console.log(call);

        // return [call.orcamento_count, call.orcamento_sit_abe, call.orcamento_sit_arq];
        // return call;

        res.render('./orcamento/orcamento_index_initial',
            { 
                title: 'Estatísticas', 
                data: call 
            });
    });
};
