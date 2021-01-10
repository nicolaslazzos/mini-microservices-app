const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const domains = [
  "http://posts-cluster-serv:4000",
  "http://comments-cluster-serv:4001",
  "http://query-cluster-serv:4002",
  "http://moderation-cluster-serv:4003",
];
 
const url = "http://localhost:5005";

app.get("/events", async (req, res) => {
  try {
    const events = await axios.get(`${url}/events`);

    res.send(events.data);
  } catch (e) {
    console.log("[GET /events]", e.message);
    res.status(500).send("Internal server error");
  }
});

app.post("/events", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const event = { id, date: new Date(), ...req.body };

    await axios.post(`${url}/events`, event);

    domains.forEach(async (url) => {
      try {
        await axios.post(`${url}/events`, event);
      } catch (e) {
        console.log(`[POST ${url}/events]`, e.message);
      }
    });

    console.log("EVENT", req.body.type);

    res.send({ status: "Ok" });
  } catch (e) {
    console.log("[POST /events]", e.message);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
