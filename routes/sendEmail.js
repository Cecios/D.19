const express = require('express')
const email = express.Router()
const {createTransport} = require('nodemailer')
//serve la configurazione che è l'host del nostro server mail, la porta di invio e le config. tsl
const transporter = createTransport(
    {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'breanna.rath@ethereal.email',
        pass: 'yRUe4aQ4u3m3XehMqg'
    }
}
) 
email.post('/sendEmail', async (request, response) => {
    const {recipient, subject, text} = request.body

    const mailOptions = {
        from: "andrea.pippo@example.com",
        to: recipient,
        subject,
        text
    }
    transporter.sendMail(mailOptions, (err,info) =>{
        if (err){
            return response.status(403).send({
                message: 'Ops Invio Email non riuscito'
            })
        }
        else{
            console.log('Email inviata');
            response.send('Email sent successfully')
        }
    })
})

module.exports = email;