var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
// const flash = require('express-flash');
// app.use(flash());

app.use(express.static( __dirname + '/public/dist/public' ));

//some computer npm install bcryptjs, change required below to ('bcryptjs')
// var bcrypt = require('bcrypt');
// var session = require('express-session');
// app.use(session({
//     secret: 'keyboardkitteh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
//   }))

//If you don't want to use Angular, just uncomment this and create folder views/index.ejs
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');
app.listen(8000, function(){
    console.log('listening at port 8000');
})

require('./server/config/mongoose');
require('./server/config/routes')(app);