const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const ports = [4000, 4001, 4002, 4003];

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

    ports.forEach(async (port) => {
      try {
        await axios.post(`http://localhost:${port}/events`, event);
      } catch (e) {
        console.log(`[POST ${port}/events]`, e.message);
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
