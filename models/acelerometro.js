'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
    axyz:[Number,Number,Number]
});

module.exports = mongoose.model('Aceletrometro', userSchema);