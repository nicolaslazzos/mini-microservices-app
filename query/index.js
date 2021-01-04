const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const url = "http://localhost:5002";

app.get("/posts", async (req, res) => {
  try {
    const result = await axios.get(`${url}/posts`);
    res.send(result.data);
  } catch (e) {
    console.log("[GET /posts]", e);
    res.status(500).send("Internal server error");
  }
});

app.post("/events", async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "PostCreated") {
      const { id, title } = data;

      await axios.post(`${url}/posts`, { id, title, comments: [] });
    } else if (type === "CommentCreated") {
      const { id, content, postId } = data;

      const post = await axios.get(`${url}/posts/${postId}`);
      const comments = [...post.data.comments, { id, content, postId }];

      await axios.patch(`${url}/posts/${postId}`, { comments });
    }

    console.log("EVENT", req.body.type);

    res.send({ status: "Ok" });
  } catch (e) {
    console.log("[POST /events]", e);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
