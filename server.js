const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api')
const mssql = require("mssql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
var bodyParser = require("body-parser"); 
const { signedCookie } = require("cookie-parser");
const session = require('express-session');
dotenv.config({ path: './.env'})
const app = express();

const PORT = process.env.PORT || 8080;

var config = ({
    server: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_password
    
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

//HTTP request logger
app.use(morgan('tiny'));
app.use('/', routes);

console.log(__dirname);




mssql.connect(config, function (error) {
    if(error) {
        console.log(error)
    } else {
        console.log("MsSQL Connected...") // log to confirm it connected to database
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
//app.use('/', require('./routes/pages'));
//app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`server is starting at ${PORT}`));