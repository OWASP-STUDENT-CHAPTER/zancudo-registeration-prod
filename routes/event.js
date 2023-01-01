const express = require("express");

// * Middleware
const { login } = require("../Middleware/auth");

// * Model
const Event = require("../models/Event");

// * API Endpoints -->
const router = express.Router();

// * List all events
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().sort({ name: 1 }).exec();
    return res.status(200).json({ body: events, error: null });
  } catch (error) {
    console.error("Error occured here \n", error);
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * Get Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).exec();
    if (!event)
      return res.status(404).status({ body: null, error: "Event not found." });

    return res.status(200).status({ body: event, error: null });
  } catch (error) {
    console.error("Error occured here \n", error);
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * End of API Endpoints -->
module.exports = router;
