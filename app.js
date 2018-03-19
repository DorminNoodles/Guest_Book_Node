let express = require("express");
let bodyParser = require("body-parser")
let app = express();
let session = session = require('express-session');

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialize: true,
	cookie: { secure: false}
}));

app.get('/', function(req, res){
	if (req.session.error){
		// response.locals.error = request.session.error;
		// req.session.error = undefined;
	}
	res.render('index');
});


// app.post('/', function(req, res){
// 	console.log(req.body);
//
// });

app.post('/', function(req, res){

	if (req.body.message === undefined || req.body.message === ''){
		req.session.error = "il y a une erreur";
		res.redirect('/');
		// res.render('index', {error: "Vous n'avez pas entré de message :("});
	}
});


app.listen(3000);
