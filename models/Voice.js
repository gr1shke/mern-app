const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        language: String,
        providerLanguage: String,
        name: String,
        id: {
            type: String,
            required: true,
            unique: true,
        },
        sex: String,
        provider: String,
        flags: {
            type: [String],
            default: []
        }
    }
);


module.exports = model('Voice', schema);