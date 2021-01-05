const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// json parser
app.use(express.json({ extended: false }));
app.use(cors());

const url = "http://localhost:5002";

const handleEvent = async (event) => {
  const { type, data } = event;

  if (type === "PostCreated") {
    const res = await axios.get(`${url}/posts?id=${data.id}`);

    // if doesnt already exist, post it
    if (!res.data.length) await axios.post(`${url}/posts`, { ...data, comments: [] });
  } else if (type === "CommentCreated") {
    const { postId } = data;

    const post = await axios.get(`${url}/posts/${postId}`);

    // if doesnt already exist, add it
    if (!post.data.comments.find((c) => c.id === data.id)) {
      const comments = [...post.data.comments, { ...data }];

      await axios.patch(`${url}/posts/${postId}`, { comments });
    }
  } else if (type === "CommentUpdated") {
    const { id, postId } = data;

    const post = await axios.get(`${url}/posts/${postId}`);

    const comments = post.data.comments.map((comment) =>
      comment.id === id ? { ...comment, ...data } : comment
    );

    await axios.patch(`${url}/posts/${postId}`, { comments });
  }

  console.log("EVENT", type);
};

app.get("/posts", async (req, res) => {
  try {
    const result = await axios.get(`${url}/posts`);
    res.send(result.data);
  } catch (e) {
    console.log("[GET /posts]", e.message);
    res.status(500).send("Internal server error");
  }
});

app.post("/events", async (req, res) => {
  try {
    await handleEvent(req.body);

    res.send({ status: "Ok" });
  } catch (e) {
    console.log("[POST /events]", e.message);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const res = await axios.get("http://localhost:5005/events");

    for (const event of res.data) {
      await handleEvent(event);
    }

    console.log("[SYNC /events] Sync Finished");
  } catch (e) {
    console.log("[SYNC /events]", e.message);
  }
});
