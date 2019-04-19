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
//session
var session = require('express-session');
app.use(session({
    secret: 'ninjashaqo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
//Validation
const flash = require('express-flash');
app.use(flash());
//password Harse
var bcrypt = require('bcrypt')
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//require mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LoginRegist', { useNewUrlParser: true });

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: [true, "First Name is required"], minlength: [2, " First Name must be  at least 2 characters"] },
    last_name: { type: String, required: [true, "Last Name is required"], minlength: [2, " Last Name must be  at least 2 characters"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"], },
    birthday: { type: Date, required: [true, "Birthday is required"] },

}, { timestamps: true });
const User = mongoose.model('User', UserSchema);// We are setting this Schema in our Models as 'User'

//Routes
app.get('/', function (req, res) {
    res.render('index')
})
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/')
})
app.get('/register', function (req, res) {
    res.render('register')
})
app.get('/homepage', function (req, res) {
    User.findOne({ email: req.session.email }, (err, user) => {
        if (err) {
            // Code...
        }
        else {
            // Code...
            res.render('homepage', { thisuser: user });
        }
    })
})

app.post('/createUser', function (req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            // Code...

        }
        else {
            if (user) {
                // Code...
                req.flash('existEmail', ' Email has been used.');
                res.redirect('/register');
            }
            else {
                if (req.body.password.length < 7) {
                    req.flash('passwordlength', " Password must be at least 7 characters");
                    res.redirect('/register')
                }
                else {
                    console.log("POST DATA", req.body);
                    bcrypt.hash(req.body.password, 10)
                        .then(hashed_password => {
                            var user = new User({ last_name: req.body.last_name, first_name: req.body.first_name, birthday: req.body.birthday, email: req.body.email, password: hashed_password })
                            console.log("call", User.name);
                            // This is where we would add the User from req.body to the database.
                            user.save(function (err) {
                                // if there is an error console.log that something went wrong!
                                if (err) {
                                    console.log('something went wrong');
                                    for (var key in err.errors) {
                                        req.flash('error', err.errors[key].message);
                                        console.log('2.something went wrong');
                                    }
                                    res.redirect('/register');
                                } else { // else console.log that we did well and then redirect to the root route
                                    console.log(user.password)
                                    console.log('successfully added a User!');
                                    req.session.email = req.body.email;
                                    res.redirect('/homepage');
                                }
                            })
                        })
                        .catch(error => {
                            console.log('error')
                        }
                        );
                }
            }



        }
    })

})
app.post('/login', function (req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if (err) {
            // Code...
            console.log("Error login.")
            req.flash('incorrectEmail', 'Invalid Email');
            res.redirect("/");

        }
        else {
            // Code...
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (result) {
                        console.log("***************************")
                        console.log("Result: ", result)
                        req.session.email = req.body.email;
                        res.redirect('/homepage');

                    }
                    else {

                        req.flash('incorrectPassword', ' Password is incorrect');
                        res.redirect("/");
                    }

                })
                .catch(error => {
                    console.log("error: ", error)
                  
                })

        }
    })
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})