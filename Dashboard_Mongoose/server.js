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
mongoose.connect('mongodb://localhost/Animals');
var AnimalSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Image: String
   },
   {timestamps: true})
mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'Animal'
var Animal = mongoose.model('Animal')

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//Routes
//Dashboard
app.get('/', function(req, res) {
    Animal.find({}, function(err, animals){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{allAnimals: animals});
            
        }
    })
    // This is where we will retrieve the Animals from the database and include them in the view page we will be rendering.
    
})
//Page to create a new animal
app.get('/new', function(req, res) {
    // This is where we will retrieve the Animals from the database and include them in the view page we will be rendering.
    res.render('FormToCreate');
})
//route to process creating
app.post('/createAnimal', function(req, res) {
    console.log("POST DATA", req.body);
    var animal = new Animal({Name: req.body.Name, Description: req.body.Description, Image: req.body.Image})
    console.log("call", Animal.Name);
    // This is where we would add the Animal from req.body to the database.
    animal.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log('something went wrong');
          res.redirect('/new');
        } else
        { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a Animal!');
          res.redirect('/');
        }
        
    })
})
//detail
app.get('/detail/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Animal.find({_id: id}, function(err, animal){
        if(err){
            console.log(err);
        }
        else{
            console.log("**************************")
            console.log(animal);
            res.render('detail',{animal: animal});
            
        }
    })
})
//edit
app.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Animal.find({_id: id}, function(err, animal){
        if(err){
            console.log(err);
        }
        else{
            console.log("**************************")
            console.log(animal);
            res.render('edit',{animal: animal});
            
        }
    })
})


app.post('/editsuccess/:id', function(req, res) {
    console.log("/at editsuccess")
    var id = req.params.id;
    console.log(id);
    Animal.update({_id: id},{$set: {Name: req.body.Name, Description: req.body.Description, Image: req.body.Image}}, function(err, animal){
        if(err){
            console.log(err);
        }
        else{
            console.log("**************************")
            console.log(animal)
            res.redirect(`/detail/${id}`);
            
        }
    })
})
//delete
app.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Animal.remove({_id: id}, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
            
        }
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
