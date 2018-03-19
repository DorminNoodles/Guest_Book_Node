let express = require("express");
let bodyParser = require("body-parser")
let app = express();
let session = require('express-session');

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session({
	secret: 'jweganoisenfgosdn',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false}
}));

app.use(require('./middlewares/flash'));


app.get('/', function(req, res){
	// console.log(req.session.error);
	// if (req.session.error){
	// 	res.locals.error = req.session.error;
	// 	req.session.error = undefined;
	// }
	res.render('index');
});


// app.post('/', function(req, res){
// 	console.log(req.body);
//
// });

app.post('/', function(req, res){

	if (req.body.message === undefined || req.body.message === ''){
		// req.session.error = "il y a une erreur";
		req.flash('error', "Vous n'avez pas posté de message");
		// res.render('index', {error: "Vous n'avez pas entré de message :("});
	}else{
		let Message = require('./models/message');
		Message.create(req.body.message, function(){
			req.flash('sucess', "Merci !");
		});
	}
	res.redirect('/');
});


app.listen(3000);
