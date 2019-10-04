let mongoose = require('mongoose');

let storeSchema = mongoose.Schema({
    name: { type: String, required: true },
    heading: { type: String, required: true },
    categoryRef: { type: Array, required: true },
    shortDes: { type: String, required: true },
    longDes: { type: String, required: true },
    img: { type: String, required: true },
    imgAlt: { type: String, required: true },
    directUrl: { type: String, required: true },
    trackUrl: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDes: { type: String, required: true },
    metaKeywords: { type: String, required: true },
    fb: { type: String, required: true },
    pin: { type: String, required: true },
    wik: { type: String, required: true },
    twit: { type: String, required: true },
    gplus: { type: String, required: true },
    android: { type: String, required: true },
    ios: { type: String, required: true },
    topStore: { type: Boolean, required: true },
    editorChoice: { type: Boolean, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Store', storeSchema);