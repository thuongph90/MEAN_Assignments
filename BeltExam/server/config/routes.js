var controllers= require('../controllers/controllers');
var path = require('path')

module.exports = function(app){
    app.get('/pets', controllers.showall) //show all
    app.post('/pets', controllers.create) //create
    app.put('/pets/:id', controllers.edit) //edit
    app.get('/pets/:id', controllers.detail) //details
    app.delete('/pets/:id', controllers.delete) //delete
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
      });
}