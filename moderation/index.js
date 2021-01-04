const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const bad = ["idiot", "fuck", "shit"];

app.post("/events", async (req, res) => {
  try {
    const { data, type } = req.body;

    if (type === "CommentCreated") {
      const status = bad
        .map((word) => data.content.toLowerCase().includes(word))
        .filter((res) => res).length
        ? "rejected"
        : "approved";

      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status },
      });
    }

    console.log("EVENT", req.body.type);

    res.send({ status: "Ok" });
  } catch (e) {
    console.log("[POST /events]", e.message);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
