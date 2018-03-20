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
	let Message = require('./models/message');
	Message.all(function(messages){
		res.render('index', {messages: messages});
	})
});

// app.post('/', function(req, res){
// 	console.log(req.body);
//
// });

app.post('/', function(req, res){
	if (req.body.message === undefined || req.body.message === ''){
		req.flash('error', "Vous n'avez pas posté de message");
	} else {
		let Message = require('./models/message');
		Message.create(req.body.message, function(){
			req.flash('success', "Merci !");
			res.redirect('/');
		});
	}
});


app.listen(3000);
