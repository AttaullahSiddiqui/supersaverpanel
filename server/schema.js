const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('mongoose-unique-validator');

// mongoose.connect('mongodb://ghayyas94:12345@ds047865.mongolab.com:47865/quizapp');
// let db = mongoose.connection;
// db.on('connect', ()=>{console.log('connected')});

let userSchema = new mongoose.Schema({
    userName: { type: String, required: true, index: true, unique: true },
    userPass: { type: String, required: true, minlength: 10 }
});


let categorySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    slug: String,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    featuredForHome: Boolean,
    CreatedAt: { type: String, default: Date.now() }
});

userSchema.plugin(validator);

let User = mongoose.model('Users', userSchema);

let Category = mongoose.model('Categories', categorySchema);