const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({}, { strict: false });

module.exports = mongoose.model('gAuth', schema);