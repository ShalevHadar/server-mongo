const mongoose = require("mongoose");

const costSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: Number, required: true},
    category: {type: String, enum:['Food', 'Health', 'Housing', 'Sport', 'Education'], required: true}
});

const costModel = mongoose.model("cost", costSchema);

module.exports = {
  costModel,
};