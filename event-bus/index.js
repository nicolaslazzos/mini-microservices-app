const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// json parser
app.use(express.json({ extended: false }));

const ports = [4000, 4001, 4002];

app.post("/events", async (req, res) => {
  try {
    const event = req.body;
    const requests = [];

    ports.forEach((port) =>
      requests.push(axios.post(`http://localhost:${port}/events`, event))
    );

    await axios.all(requests);

    console.log("EVENT", req.body.type);

    res.send({ status: "Ok" });
  } catch (e) {
    console.log("[POST /events]", e.message);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
