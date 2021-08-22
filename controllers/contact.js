
var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');
const hubspot = require('@hubspot/api-client');



module.exports = function ContactController(req, res, next) {
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

    const validateData = () => {
        if (body) {
            if (body.email) {
                if (body.name) {
                    if (body.subject) {
                        if (body.message) {
                            return true;
                        }
                        else {
                            res.status(400).send({ error: "Missing Message Field" });
                            return false;
                        }
                    }
                    else {
                        res.status(400).send({ error: "Missing Subject Field" });
                        return false;
                    }
                }
                else {
                    res.status(400).send({ error: "Missing Name Field" });
                    return false;
                }
            }
            else {
                res.status(400).send({ error: "Missing Email Field" });
                return false;
            }
        }
        else {
            res.status(400).send({ error: "Missing data" });
            return false;
        }
    };

    if (validateData()) {
        let mailDetails = {
            from: "crazybaib@gmail.com",
            to: body.email,
            subject: body.subject,
            text: body.message,
            headers: {
                'priority': 'high'
            },
            html: `<h3>${body.name}</h3><h5>${body.phone}</h5><h5>${body.email}</h5><h5>${body.subject}</h5><p>${body.message}</p>`
        };

        const hubspotClient = new hubspot.Client({ "apiKey": "eu1-16ad-dab8-44be-b02d-83b785eb8fa3" });

        const properties = {
            name: body.name,
            subject: body.subject,
            email: body.email,
            phone: body.phone,
            order_message: body.message

        };
        const simplePublicObjectInput = { properties };

        const HubspotContact = async () => {
            try {
                const apiResponse = await hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInput);
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        res.status(400).send({ error: err });
                    } else {
                        res.status(200).json({ message: 'Request has been submitted!' });
                    }
                });
            } catch (e) {
                console.log(e.statusCode)
                if (e.statusCode === 409) {
                    const errMessage = e.response.body ? e.response.body.message : '';
                    res.status(400).send({ error: errMessage.split('.')[0] });
                }
                else if (e.statusCode === 200) res.status(200).send({ message: "Request has been submitted!" });
            }
        }

        HubspotContact();

    }
})

module.exports = router;