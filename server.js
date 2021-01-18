const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
   //forcing use of https
   app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') 
      return res.redirect('https://'+ req.headers.host + req.url);
    else
      return next();
  });
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
//get SSL
/* app.get('/.well-known/acme-challenge/:content',function(req,res){
  res.send('QqMl0ojsd9qfuvC75g0cd3kF5yHrVkkagBWag-oHEB0.N4tbdafRM11q63l9g2wR5R06hLGFmj5uh7GDEl21n9s');
}) */

app.listen(port, () => console.log(`Listening on port ${port}`));
