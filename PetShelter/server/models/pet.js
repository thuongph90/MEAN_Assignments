var mongoose = require('mongoose');

//Below is example create a schema
var PetSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: [3, " Name must be  at least 3 characters"], unique: [true, "Name exists."] },
    type: { type: String, required: [true, "Type is required"], minlength: [3, " Type must be  at least 3 characters"]},
    description: { type: String, required: [true, "Description is required"], minlength: [3, " Description must be  at least 3 characters"],},
    skill1:{type: String,},
    skill2:{type: String,},
    skill3:{type: String,},
},{ timestamps: true })

mongoose.model('Pet', PetSchema); // 'DATANAME' , matching DATANAME you set in controllers.js
