let connection = require('../config/db');

class Message {

	static create(content, cb){
		if(connection.state === 'disconnected'){
			console.log("connection bad");
  		}
		connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], function (err, result){
			if (err)
			{
				console.log("error sql")
				// throw err;
			}
			cb(result);
		});
	}

}

module.exports = Message;
