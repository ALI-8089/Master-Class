/* eslint-disable no-undef */
const nodemailer = require('nodemailer')

module.exports = async (email, code) => {
  try {
    console.log("2nd");
    const transporter = nodemailer.createTransport({
      host: process.env.AUTH_USER,
      service: process.env.AUTH_SERVICE,
      port: process.env.AUTH_PORT,
      secure: false,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: 'captian.8089@gmail.com',
      to: email,
      subject: ' Verification mail',
     
      html:
        '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
      amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
      <h2>This is your verification code ${code}
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>
          <amp-anim src="https://media.giphy.com/media/R03zWv5p1oNSQd91EP/giphy.gif" width="500" height="350"/></p>
      </body>
    </html>`,
    })
    console.log('email send successfully')
  } catch (err) {
    console.log(err)
  }
}
