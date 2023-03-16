const projectPolls = require("../controllers/polls.controllers");

module.exports = (app) => {
  app.post("/api/polls/new", projectPolls.createPoll);
  app.get("/api/polls", projectPolls.allPolls);
  app.get("/api/polls/top3", projectPolls.getTop3);
  app.put("/api/polls/:_id/votes/:_idvotes", projectPolls.updateVote);
  app.get("/api/poll/:_id", projectPolls.getPoll);
  app.patch("/api/poll/edit/:_id", projectPolls.editPoll);
  app.delete("/api/poll/delete/:_id", projectPolls.delete);

};
