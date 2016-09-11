var nodemailer = require ("nodemailer");
var express    = require ("express");
var site       = express ();

var smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'ssnfallon779@gmail.com',
    pass: 'madcat888'
  }
};

var mailtransport = nodemailer.createTransport (smtpConfig);

function layout (body) {
  return [
    '<!DOCTYPE html>',
    '<head>',
    '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">',
    '</head>',
    '<body>',
    '<div class="navbar navbar-default">',
    '<div class="container">',
    '<ul class="nav navbar-nav">',
    '<li><a href="/">Home</a></li>',
    '<li><a href="/about">About</a></li>',
    '<li><a href="/contact">Contact</a></li>',
    '</ul>',
    '</div>',
    '</div>',
    '<div class="container">',
    body,
    '</div>',
    '</body>',
    '</html>'
  ].join ('');
}


site.use (require ('body-parser').urlencoded ({ extended: true }));

site.get ("/", function (request, response) {
  response.send (layout ("<h1>Welcome to Sue's Site</h1><a href='/about'>Read About Me</a><br /><a href='/contact'>Contact Me</a>"));
});

site.get ("/about", function (request, response) {
  response.send (layout ("<h1>About Me</h1><p>Hello, my name is Sue</p>"));
});

site.get ("/contact", function (request, response) {
  response.send (layout ([
    "<div class='row'>",
    "<div class='col-md-offset-2 col-md-8'>",
    "<h1>Contact Me<small><br/>Send me a message</small></h1>",
    "<h4>Fill in the form below if you want to get in contact with me</h4>",
    "<form method='POST' action='/contact' class='form-horizontal'>",
    "<div class='form-group'>",
    "<label class='control-label col-md-4'>Your Name</label>",
    "<div class='col-md-8'>",
    "<input type='text' class='form-control' name='name' required />",
    "</div>",
    "</div>",
    "<div class='form-group'>",
    "<label class='control-label col-md-4'>Your Email</label>",
    "<div class='col-md-8'>",
    "<input type='email' class='form-control' name='email' required />",
    "</div>",
    "</div>",
    "<div class='form-group'>",
    "<label class='control-label col-md-4'>Your Message</label>",
    "<div class='col-md-8'>",
    "<textarea rows='8' name='message' class='form-control' required></textarea>",
    "</div>",
    "</div>",
    "<div class='btn-group pull-right'>",
    "<button type='submit' class='btn btn-lg btn-primary'>Send Message</button>",
    "</div>",
    "</form>",
    "</div>",
    "</div>"
  ].join ('')));
});

site.post ("/contact", function (request, response) {
  var mailOptions = {
    from: request.body.name + ' <' + request.body.email + '>',
    to:   'Susan Fallon <ssnfallon779@gmail.com>',
    replyTo: request.body.email,
    subject: 'New Contact',
    text: ['Hi Sue',
           'You have a new contact:',
           'Sender : ' + request.body.name,
           'Email  : ' + request.body.email,
           'Message: ' + request.body.message
          ].join ('\n')
  };

  mailtransport.sendMail (mailOptions, function (error, info) {
    if (error) {
      console.log (error);
    } else {
      console.log ('Message Sent: ' + info.response);
    }
  });

  response.send (layout ([
    '<h1>Thank You!</h1>',
    '<h2>Thank you ' + request.body.name + ' for your message!</h2>',
    '<script>window.setTimeout (function () { location.replace ("/"); }, 5000);</script>'
  ].join ('')));
});

site.listen (4000);




