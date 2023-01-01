const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
  ],
  inviteCode: {
    type: String,
    required: true,
    unique: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

teamSchema.index({ event: 1, teamName: 1 }, { unique: true });

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
