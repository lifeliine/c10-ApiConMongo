const mongoose = require('mongoose');
const { Schema } = mongoose;
var uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name required.']
        },
        lastName: {
            type: String,
            required: [true, 'Lastname required.']
        },
        email: {
            type: String,
            required: [true, 'Email required.'],
            unique: true,
            index: true
        },
        birthdate: { 
            type: Date 
        },
        password: {
            type: String,
            required: [true, 'Password required.']
        },
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            enum: ['USER_ROLE', 'ADMIN_ROLE']
        },
        enable: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {timestamps: true}
);

userSchema.plugin(uniqueValidator, {message:' already exist in DB'});
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users',userSchema); //.model(nombre de coleccion,esquema de coleccion)