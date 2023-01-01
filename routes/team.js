const express = require("express");
const shortid = require("shortid");
const axios = require("axios");

// * Middleware
const { login } = require("../Middleware/auth");

// * Validators
const { createTeam, joinTeam } = require("../utils/validation/validators");

// * Models
const Team = require("../models/Team");
const Event = require("../models/Event");
const Participant = require("../models/Participant");

// * API Endpoints -->
const router = express.Router();

// * Create Team
router.post("/new/:eventId", login, async (req, res) => {
  try {
    let [team, event] = await Promise.all([
      Team.findOne({
        event: req.params.eventId,
        members: req.user._id,
      }).exec(),
      Event.findById(req.params.eventId).exec(),
    ]);

    if (!event)
      return res.status(400).json({ body: null, error: "Invalid event" });

    if (!event.open)
      return res
        .status(400)
        .json({ body: null, error: "Team Registration Closed." });

    if (team)
      return res.status(400).json({
        body: null,
        error: `You are already a part of ${team.teamName}: ${team.inviteCode} for this event.`,
      });

    const { value, error } = createTeam(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: `Validation Error. ${error.details[0].message}`,
      });

    team = new Team({
      teamName: value.teamName,
      members: req.user._id,
      inviteCode: shortid.generate().toString(),
      event: req.params.eventId,
    });
    team = await team.save();

    return res.status(200).json({
      body: team,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      body: null,
      error: "Request refused. Try changing team name",
    });
  }
});

// * Join Team
router.post("/join/:eventId", login, async (req, res) => {
  try {
    const existingTeam = await Team.findOne({
      event: req.params.eventId,
      members: req.user._id,
    }).exec();
    if (existingTeam)
      return res.status(400).json({
        body: null,
        error: `You are already a part of ${existingTeam.teamName} for this event.`,
      });

    const { value, error } = joinTeam(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: `Validation Error. ${error.details[0].message}`,
      });

    const [team, event] = await Promise.all([
      Team.findOne({
        event: req.params.eventId,
        inviteCode: value.inviteCode,
      }).exec(),
      Event.findById(req.params.eventId).exec(),
    ]);

    if (!event)
      return res
        .status(400)
        .json({ body: null, error: "Invalid event. Try Again." });

    if (!event.open)
      return res
        .status(400)
        .json({ body: null, error: "Team Registration Closed." });

    if (!team)
      return res
        .status(400)
        .json({ body: null, error: "Invalid invite code. Try Again." });

    if (team.members.length === event.teamSize.max)
      return res
        .status(400)
        .json({ body: null, error: "Max team limit reached." });

    team.members.push(req.user._id);
    team.markModified("members");
    await team.save();

    return res.status(200).json({
      body: { team, message: `Team ${team.teamName} joined.` },
      error: null,
    });
  } catch (error) {
    console.error("Error occured here \n", error.toString());
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * Leave Team
router.put("/leave/:teamId", login, async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { _id: req.params.teamId, members: req.user._id },
      { $pull: { members: req.user._id } },
      { new: true }
    );
    if (!team)
      return res
        .status(400)
        .json({ body: null, error: "You are not a part of the team." });

    if (team.members.length === 0) {
      await team.remove();
      return res.status(200).json({
        body: "Team left successfully. Team Deleted.",
        error: null,
      });
    } else { 
      return res.status(200).json({
        body: "Team left successfully.",
        error: null,
      });
    }
  } catch (error) {
    console.error("Error occured here \n", error.toString());
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * Send Team to The Social Network
router.get("/social_network", login, async (req, res) => {
  try {
    const [social, user] = await Promise.all([
      Event.findById("5fd09a8bb042c9b984d7cbb2").exec(),
      Participant.findById(req.user._id).populate("teams").exec(),
    ]);
    const team = user.teams.find(
      (team) => team.event.toString().trim() === "5fd09a8bb042c9b984d7cbb2"
    );
    if (!team) {
      return res
        .status(404)
        .json({ error: "You dont have an team for this event.", body: null });
    }
    try {
      const response = await axios.default.post(
        `${social.link}/socialNetwork/createTeam`,
        {
          secret: "kuchhtohsecretrakhnapadeganabhai",
          teamId: team.teamName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.status(200).json({ error: null, body: response.data.info });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Something went wrong. Retry", body: null });
    }
  } catch (error) {
    console.error("Error occured here \n", error.toString());
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

router.get('/members/:id',async (req,res)=>{
  const id=req.params.id;
  const team=await Team.findById(id).populate('members');
  // const members=await team.populate('events')
    // console.log(team,id);
    if(!team)
      return res.status(404).json({body:null,error:"No Member in team"});
    const members= team.members.map(data=>{
      return {
        name : data.name,
      }
    })
    console.log(members);
    return res.status(200).json({body:members,error:null});
})

// * End of API Endpoints -->
module.exports = router;
