var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwerty',
  database : 'guest_book'
});

connection.connect(function(err) {
	if (err){
    	console.error('error connecting: ' + err.stack);
    	return;
	}

	// console.log(connection);
	// if(connection.state === 'disconnected'){
	// }
});

module.exports = connection;
