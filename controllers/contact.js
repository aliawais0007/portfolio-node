
var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');



router.post("/contact", express.urlencoded({ extended: true }), function (req, res, next) {
    const body = req.body;
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crazybaib@gmail.com',
            pass: 'ali497070'
        }
    });


    let mailDetails = {
        from: "crazybaib@gmail.com",
        to: body.email,
        subject: body.subject[0],
        text: body.message,
        html: `<h3>${body.name}</h3><h5>${body.phone}</h5><h5>${body.email}</h5><h5>${body.subject}</h5><p>${body.message}</p>`
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            res.status(400).send({ error: "Request failed please try again later!" });
            console.log('Error Occurs');
        } else {
            res.status(200).json({ message: 'Request has been submitted!' });
        }
    });

})

module.exports = router;