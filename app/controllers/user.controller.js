import db from "../models/index.js";

async function allAccess(req, res) {
  
  res.status(200).send({
    message: "Public Content."
  });
}

function userBoard(req, res) {
  res.status(200).send("User Content.");
}

function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

function moderatorBoard(req, res) {
  res.status(200).send("Moderator Content.");
}

export default {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard
}