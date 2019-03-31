const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    description: {
        type: string,
        required: true,
        max: 200
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_date: {
        default: Date.now()
    },
});

module.exports = mongoose.model('Application', applicationSchema);