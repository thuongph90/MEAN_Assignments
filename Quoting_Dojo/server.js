// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
//require mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users');
var UserSchema = new mongoose.Schema({
    name: String,
    quote: String,
   },
   {timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
   
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/createquote', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.Name, quote: req.body.Quote})
    console.log("call", user.name);
    // This is where we would add the user from req.body to the database.
    user.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log('something went wrong');
          res.redirect('/');
        } else
        { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a user!');
          res.redirect('/quote');
        }
        
      })
    
})
app.get('/quote', function(req, res) {
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        else{
            res.render('quotes', {quotes: users});
        }
    })

    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})