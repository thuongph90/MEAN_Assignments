var mongoose = require('mongoose');
require('../models/models.js');

var Pet = mongoose.model('Pet'); //Any name is okay

module.exports={
    showall: function (req, res) {
        Pet.find({},function (err, pets) { //1 is from A-Z; -1 is from Z-A
            if (err) {
                console.log(err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ message: "Success", data: pets });
            }
        }).sort({"type":1});
    },
    create: function (req, res) {
        console.log("input", req.body.type, req.body.skill1, req.body.description);
    var pet = new Pet({name: req.body.name , type: req.body.type, description: req.body.description , skill1: req.body.skill1 ,skill2: req.body.skill2 , skill3: req.body.skill3 } )
    console.log("call", pet.type);
    console.log("call", pet.name);
    console.log("call", pet.skill1);
    console.log("call", pet.skill2);
    console.log("call", pet.skill3);
        // This is where we would add the Pet from req.body to the database.
        pet.save(function (err, pet) {
            // if there is an error console.log that something went wrong!
            if (err) {
                console.log('something went wrong');
                console.log("This is what went wrong:"+err);
                res.json({message: "Error", error: err})
               
                // res.redirect('/Pets');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added a Pet!');
                res.json({message: "Success", data: pet})
                // res.redirect('/');
            }

        })
    },

    edit: function(req,res){
        console.log("/at editsuccess")
    var id = req.params.id;
    console.log(id);
    Pet.findOne({_id: id}, function(err, pet){
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            pet.name= req.body.name;
            pet.type= req.body.type;
            pet.description= req.body.description;
            pet.skill1= req.body.skill1;
            pet.skill2= req.body.skill2;
            pet.skill3= req.body.skill3;
            pet.likes=req.body.likes;
            pet.save(function(err){
                if(err){
                    console.log("Validation error")
                    res.json({message: "Error", error: err})
                }
                else{
                    console.log("Successfully update")
                    res.json({message: "Success", data: pet})
                    // res.redirect('/')
                }
            })
            // res.redirect(`/`);
            
        }
    })
    },
    detail: function(req,res){
        var id = req.params.id;
    console.log(id);
    Pet.find({_id: id}, function(err, pet){
        if(err){
            console.log(err);
        }
        else{
            console.log("**************************")
            console.log(pet);
            res.json({message:"Success", data: pet})
            
            
        }
    })
    },
    delete: function(req,res){
        var id = req.params.id;
    console.log(id);
    Pet.remove({_id: id}, function(err){
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.redirect('/');
            
        }
    })
    }
}
