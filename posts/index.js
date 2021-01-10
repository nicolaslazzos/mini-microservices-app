const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const url = "http://localhost:5000";
const eventsUrl = 'http://event-bus-cluster-serv:4005'

// unused
app.get("/posts", async (req, res) => {
  try {
    const result = await axios.get(`${url}/posts`);
    res.send(result.data);
  } catch (e) {
    console.log("[GET /posts]", e);
    res.status(500).send("Internal server error");
  }
});

app.post("/posts/create", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    const result = await axios.post(`${url}/posts`, { id, title });

    // sending event to the bus
    await axios.post(`${eventsUrl}/events`, {
      type: "PostCreated",
      data: result.data,
    });

    res.status(201).send(result.data);
  } catch (e) {
    console.log("[POST /posts]", e.message);
    res.status(500).send("Internal server error");
  }
});

app.post("/events", (req, res) => {
  console.log("EVENT", req.body.type);
  res.send({ status: "Ok" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
