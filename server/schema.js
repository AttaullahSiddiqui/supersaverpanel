let mongoose = require('mongoose');
let bodyParser = require('body-parser');
// let bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let validator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

// mongoose.connect('mongodb://ghayyas94:12345@ds047865.mongolab.com:47865/quizapp');
// let db = mongoose.connection;
// db.on('connect', ()=>{console.log('connected')});

let userSchema = new Schema({
    userName: { type: String, required: true, index: true, unique: true },
    userPass: { type: String, required: true, minlength: 10 }
});


let categorySchema = new Schema({
    name: { type: String, unique: true },
    slug: String,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    featuredForHome: Boolean,
    CreatedAt: { type: String, default: Date.now() }
});

userSchema.plugin(validator);

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
    });
});

bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
    // res == true
});

async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
        //login
    }

    //...
}

// var SALT_FACTOR = 10;

// userSchema.pre("save", (next) => {
//     var user = this;
//     if (!this.isModified("password")) {
//         return next();
//     }
//     bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
//         if (err) {
//             var hashError = new Error("Unexpcted error")
//             next(hashError);
//         }
//         user.password = hash;
//         next();
//     });
// });

// let User = mongoose.model('Users', userSchema);\
// let Category = mongoose.model('Categories', categorySchema);

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Category', categorySchema);