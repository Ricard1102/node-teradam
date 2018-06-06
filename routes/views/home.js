var keystone = require('keystone');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';


  // Render the view
  view.render('home', {

    //Head.hbs variables
    keywords: 'teradam, téradam, novela de aventuras, novela ciencia-ficción, trilogía, Siro, Matildet, aventuras en el desierto, novela juvenil',
    metaDescription: 'Bienvenidos a la página oficial de Téradam (Teradam). El autor, Ricard Ribatallada, presenta aquí su trilogía de aventuras y ciencia-ficción narrando la historia de Siro y Matildet en su peligroso viaje a través del desierto. Encuentra aquí material adicional sobre esta saga, contacta al autor y descubre notícias y eventos relacionados con los libros',
    pageTitle: 'Téradam',

    //Header.hbs variables
    logo: '/img/logo.png',
    logoCaption: 'Téradam logo',
    logoTitle: 'Téradam',
    // menu1: '',
    // menu2: '',
    // menu3: '',
    // menu4: '',
    // menu5: '',
    //Hero variables
    h1Title: 'Téradam',
    portada: '/img/portada_libro.png',
    webmail: 'rribatallada@teradam.com',
    twitter_url: '',
    facebook_url: 'https://www.facebook.com/teradamnovela/',
    googleplus_url: '',
    instagram_url: 'https://www.instagram.com/ricard_teradam/',
    linkedin_url: '',
    youtube_url: '',
    amazon_url: 'https://www.amazon.es/T%C3%A9radam-Ricard-Ribatallada-Soriano/dp/8469759027/ref=sr_1_1?ie=UTF8&qid=1528198078&sr=8-1&keywords=teradam',
    buyTeradam: 'https://www.amazon.es/T%C3%A9radam-Ricard-Ribatallada-Soriano/dp/8469759027/ref=sr_1_1?ie=UTF8&qid=1528198078&sr=8-1&keywords=teradam',
    //Maps
    address: '',
    map_link: '',

    //Services variables
    // cancellationPolicy1: 'The Beute Clinic operates a cancellation policy. Our policy is similar to many other medical clinics and we ask all patients kindly to adhere to it.',
    // cancellationPolicy2: 'Should you wish to cancel or reschedule an appointment we simply ask you to give a minimum of 24 hours notice for our shorter 30 minute appointments and 48 hours notice for our longer appointments such as our biomechanical assessments, nail surgery appointments and home visits. If this minimum is not adhered to, we reserve the right to charge the full treatment cost of the appointment.',
    // cancellationPolicy3: 'We are aware that from time to time individual circumstances dictate that an appointment will be missed or less than the 24 hours notice will be given. On such occasions we can be lenient but frequent missed appointments can be very disruptive to the smooth running of the clinic and can also be inconvenient to other patients that require an appointment slot',


    //Contact Variables
    businessPhone: '+44 (0) 7706 73 87 53'



  });


  app.post('/send', (req, res) => {
    const output = `<p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
   
  
      <li>Subject: ${req.body.subject}</li>
      <li>Message: ${req.body.message}</li>
      </ul>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.google.com',
      port: 25, //587
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: process.env.MAIL_FROM, // sender address
      to: process.env.MAIL_TO, // list of receivers
      subject: 'Contact request', // Subject line
      text: 'Hello world', // plain text body
      html: output // html body
    };

    // send mail with defined transport object


    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('thanks', { businessName: 'Téradam' });



    });

  });








};
