const express     = require('express');
const app         = express();
const path        = require('path');
const mysql       = require('mysql');
const session     = require('express-session');
const MySQLStore  = require('express-mysql-session')(session);
const Router      = require('./Router');
const { Connection } = require('tedious');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//const { Session } = require('inspector');


var config ={
  authentication: {
  options: {
    userName: "ThyrrestrupAdmin", // update me
    password: "Tmink1234567" // update me
  },
  type: "default"
},
server: "thyrrestrupserver.database.windows.net", // update me
options: {
  database: "ThyrrestrupDB", //update me
  encrypt: true
}
};
const conn = new Connection(config);

conn.connect(function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
    throw err;
    return false;
  }
  /*
	else
	{
	   console.log("Connection established.");
           queryDatabase();
	}	*/
});
/*
const sessionStore = new MySQLStore({
  expiration: (1825 * 86400 * 1000),
  endConnectionOnClose: false
}, conn);

app.use(session({
  key: ' eafjazfhsjahkehjquwai',
  secret: 'hciayuegwfhsjednbciyasgzh',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1825 * 86400 * 1000),
    httpOnly: false
  }

}));
*/
new Router (app, conn);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(3000)
/*
	   conn.query('INSERT INTO Person (surName, password) VALUES (?, ?);', ['banana', '150'], 
      		function (err, results, fields) {
      			if (err) throw err;
			else console.log('Inserted ' + results.affectedRows + ' row(s).');
       })
       /*
	   conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154], 
      		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100], 
		function (err, results, fields) {
      			if (err) throw err;
			console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
	   conn.end(function (err) { 
		if (err) throw err;
		else  console.log('Done.') 
		});
};*/