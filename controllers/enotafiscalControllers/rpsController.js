const axios = require('axios');
const url = process.env.RPS_URL || 'http://localhost:7575/enotafiscal/api/v1/rps/';
const urlCreate = process.env.RPS_URL_CREATE || 'http://localhost:7575/enotafiscal/api/v1/rps/create';
const urlUpdate = process.env.RPS_URL_UPDATE || 'http://localhost:7575/enotafiscal/api/v1/rps/update/';

exports.rps_index = (req, res, next) => {

    res.render('./enotafiscal/rps_index', {
        title: 'RPS Home'
    });
};

exports.rps_list = (req, res, next) => {

    (async () => {
        try {

            const response = await axios.get(url);

            console.log('RES-DATA-MESS: \n', response.data.message);
            res.render('./enotafiscal/rps_list',
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

            const response = await axios.get(url+req.params.id);
            console.log(response.data.message);
            const retido = response.data.message.issRetido === true ? 'Sim' : 'Não'

            res.render('./enotafiscal/rps_detail',
                {
                    title: 'Detalhe de RPSs',
                    rps_list: response.data.message,
                    issRetido: retido
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_create_get = (req, res, next) => {

    var n = 0;

    (async () => {
        try {

            const response = await axios.get(url);
            const num = response.data.message;

            if(num == '') {
                n = 1;
            
            }
            else {

                for (let re in num) {

                    console.log('RE: ',re);

                    n ++;
                }
                n ++;
            }

            var datetime = new Date();
            res.render('./enotafiscal/rps_form',
                {
                    title: 'Nova RPS',
                    numero: n,
                    data: datetime,
                    // csrfToken: req.csrfToken() 
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_create_post = (req, res, next) => {

    const data = req.body;

    (async () => {
        try {

            const response = await axios.post(urlCreate, data );

            res.redirect('/rpss/rps/'+response.data.message._id);
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_update_get = (req, res, next) => {

    const rpsId = req.params.id;

    (async () => {
        try {

            const response = await axios.get(url+rpsId);
            const rps = response.data.message;

            var datetime = new Date();
            res.render('./enotafiscal/rps_form',
                {
                    title: 'Alterar RPS',
                    data: datetime,
                    rps_list: rps
                    // csrfToken: req.csrfToken() 
                });
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_update_post = (req, res, next) => {
    
    const dataBody = req.body;

    (async () => {
        try {

            const response = await axios.put(urlUpdate+dataBody.id, dataBody );

            res.redirect('/rpss/rps/'+response.data.message._id);
        } catch (err) {

            return next(err)
        }
    })();
};

exports.rps_delete = (req, res, next) => {

    const idDelete = req.params.id;
    (async () => {
        try {

            const response = await axios.delete(url+idDelete);

            res.redirect('/rpss/rps');
            
        } catch (err) {

            return next(err)
        }
    })();
};
