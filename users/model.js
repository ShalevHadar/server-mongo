const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  personal_id: {
    type: Number,
    unique: true,
    required: true,
    dropDups: true,
    validate: {
        validator: function(val) {
            return val.toString().length === 9
        },
        message: val => `${val.value} has to be 9 digits`
    }
},
  first_name: { type: String, required: true},
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true},
  marital_status: {type: String, enum:['Married', 'Single', 'Divorced', 'Widowed'], required: true},
  items: [{type: mongoose.Types.ObjectId}],
  sum: {type: Number, default: 0 ,required: true}

});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};