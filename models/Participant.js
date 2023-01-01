const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 40,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicLink: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true
    },
    rollNo: {
      type: Number,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ["school", "first", "second", "third", "fourth"],
      required: true,
    },
  },
  { toJSON: { virtuals: true } }
);

participantSchema.virtual("teams", {
  ref: "Team",
  localField: "_id",
  foreignField: "members",
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
