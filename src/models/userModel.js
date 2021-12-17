const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
        id:  String, 
        name: String,
        lastName:   String,
        email: String,
        birthdate: { type: Date }
    },
    {timestamps: true}
);

module.exports = mongoose.model('users',userSchema); //.model(nombre de coleccion,esquema de coleccion)