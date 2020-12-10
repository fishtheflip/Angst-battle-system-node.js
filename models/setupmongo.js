const {Schema, model} = require('mongoose');

const setup = new Schema({
    red: {
        type:String,
        required: true
    },
    blue: {
        type: String,
        required: true
    },
    rounds: {
        type: Number,
        required: true
    }
});

module.exports = model('SetupMongo', setup);