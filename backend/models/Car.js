const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    kms: { type: Number, required: true },
    vin: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 4'] },
});

// Limit images to 4 URLs
function arrayLimit(val) {
    return val.length <= 4;
}

module.exports = mongoose.model('Car', carSchema);
