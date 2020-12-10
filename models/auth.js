const {Schema, model} = require('mongoose');

const authmongo = new Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('AuthMongo', authmongo);