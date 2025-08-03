const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NortesSchema = new Schema({
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: { type: String, required: true },
    tag: { type: String, default: "General" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('note', NortesSchema);