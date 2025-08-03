const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true }, // String is shorthand for {type: String}
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);