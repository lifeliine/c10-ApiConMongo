const mongoose = require('mongoose');
const { Schema } = mongoose;

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
            unique: true
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

module.exports = mongoose.model('users',userSchema); //.model(nombre de coleccion,esquema de coleccion)