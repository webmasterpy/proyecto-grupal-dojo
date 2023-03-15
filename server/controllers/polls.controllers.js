const Polls = require("../models/polls.models");
const Options = require("../models/polls.models");

const errors = {
  optionsError: "¡Se necesita 2 o más opciones de votación!",
};

module.exports.createPoll = (req, res) => {
  let options = req.body.options;
  if (options.length <= 1) {
    res.status(400).json({ error: { message: errors.optionsError } });
    return null;
  }
  console.log(req.body);

  let poll = {
    question: req.body.question,
    options: [],
  };

  options.forEach((op) => {
    poll.options.push({ name: op.name, votes: 0 });
  });

  Polls.create(poll)
    .then((newPoll) => res.status(200).json(newPoll))
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

module.exports.allPolls = (req, res) => {
  Polls.find()
    .sort({ createdAt: -1 })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
};

module.exports.getTop3 = (req, res) => {
  Polls.aggregate([{ $sort: { "options.votes": -1 } }, { $limit: 3 }])
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
};

module.exports.getPoll = (req, res) => {
  const _id = req.params._id;
  Polls.find({ _id: _id })
    .then((data) => res.status(200).json(data[0]))
    .catch((error) => res.status(400).json(error));
};

module.exports.updateVote = (req, res) => {
  const _id = req.params._id;
  const _idvotes = req.params._idvotes;

  Polls.findByIdAndUpdate(
    { _id: _id },
    { $inc: { "options.$[elem].votes": 1 } },
    { arrayFilters: [{ "elem._id": _idvotes }] }
  )
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
};
