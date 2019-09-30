let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: { type: String, unique: true },
    slug: String,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    featuredForHome: Boolean,
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Category', categorySchema);