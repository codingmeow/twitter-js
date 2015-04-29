var express = require( 'express' );
var logger = require('morgan');
var swig = require('swig');

swig.setDefaults({ cache: false });//so it doesn't get in the way when we are coding

var app = express();

app.use( logger('dev') );


app.engine('html', swig.renderFile); //render HTML

app.set('view engine', 'html'); //sets the default view engine to html (so we don't have to specify on every render)
app.set('views', __dirname + '/views'); // sets the views path to our views folder (where we store our templates)


app.get('/', function (req, res) {
  // res.send('Hello World!');
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );
});

var server = app.listen(3000, function () {
  
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

