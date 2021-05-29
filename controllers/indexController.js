const nodemailer = require('nodemailer');


exports.contato_get = (req, res, next) => {

    res.render('site_contato', { title: 'Contato', csrfToken: req.csrfToken() });
};

exports.contato_post = (req, res, next) => {

    let c_name = req.body.contato_name;
    let c_mail = req.body.contato_mail;
    let c_title = req.body.contato_title;
    let c_message = req.body.contato_message;

    // config email transport
    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT, // true for 465, false for other ports
      host: process.env.MAIL_HOST,
         auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
           },
      secure: true,
      });

    const mailData = {
        
        from: c_mail,  // sender address
        to: process.env.MAIL_TO,   // list of receivers
        subject: c_name+' - '+c_title,
        text: c_message
    };

    transporter.sendMail(mailData, (err, info) => {

        if(err) { return next(err); }

        res.render('site_contato',
            { 
                title: 'Contato', 
                message: c_name+'. Sua mensagem foi enviada! Sua resposta será encaminhada o mais breve possível.' 
            });
    });
};