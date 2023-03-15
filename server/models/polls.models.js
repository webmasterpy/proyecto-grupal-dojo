const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const SchemaOptions = mongoose.Schema({
  name: String,
  votes: Number,
});

const SchemaPolls = mongoose.Schema(
  {
    question: { type: String, unique: true, min: 10 },
    options: [SchemaOptions],
  },
  { timestamps: true }
);

SchemaPolls.plugin(uniqueValidator);

const Polls = mongoose.model("Polls", SchemaPolls);
//const Questions = mongoose.model("Options", SchemaOptions);

module.exports = Polls;
//module.exports = Questions
