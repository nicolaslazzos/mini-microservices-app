const express = require("express");
const axios = require("axios");
const cors = require('cors');
const { randomBytes } = require("crypto");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const url = "http://localhost:5001";

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await axios.get(`${url}/comments?postId=${postId}`);
    res.send(result.data);
  } catch (e) {
    console.log("[GET /posts/:id/comments]", e);
    res.status(500).send("Internal server error");
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;
    const result = await axios.post(`${url}/comments`, { id, content, postId });
    res.status(201).send(result.data);
  } catch (e) {
    console.log("[POST /posts/:id/comments]", e.message);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
