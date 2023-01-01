const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  open: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    required: true,
  },
  teamSize: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
