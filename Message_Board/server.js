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
var session = require('express-session');
app.use(session({
    secret: 'ninjashaqo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
 }))
const flash = require('express-flash'); //Validation
app.use(flash());

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//require mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MessagesBoard', { useNewUrlParser: true });
const CommentSchema = new mongoose.Schema({
    Comment: { type: String, required: [true, "Comment must have content"] },
    Name: { type: String, required: [true, " Name is required"] },
})
const MessageSchema = new mongoose.Schema({
    Message: { type: String, required: [true, "Message must have content"] },
    Name: { type: String, required: [true, " Name is required"] },
    comment: [CommentSchema]
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'Message'
const Comment = mongoose.model('Comment', CommentSchema)

//Routes

app.get('/', function (req, res) {
    Message.find({}, function (err, Messages) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', { allMessages: Messages });

        }
    })
})

//route to process creating message
app.post('/createMessage', function (req, res) {
    console.log("POST DATA", req.body);
    var message = new Message({ Name: req.body.Name, Message: req.body.Message })
    console.log("call", Message.Name);
    // This is where we would add the Message from req.body to the database.
    message.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            for(var key in err.errors){
                req.flash('error', err.errors[key].message);
            }
            res.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a Message!');
            res.redirect('/');
        }

    })
})
//route to process creating
app.post('/createComment/:id', function (req, res) {
    Comment.create(req.body, function (err, data) {
        if (err) {
            for(var key in err.errors){
                req.flash('error', err.errors[key].message);
            }
            res.redirect('/');
            // handle the error from creating a blog
        }
        else {
            Message.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: data } }, function (err, data) {
                if (err) {
                    // handle the error from trying to update the user
                    res.redirect('/');
                }
                else {
                    // it worked! How shall we celebrate?
                    res.redirect('/');
                }
            })
        }
    })
    
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
