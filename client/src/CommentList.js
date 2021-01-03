import React from "react";
import axios from "axios";
import { List } from "grommet";

const CommentList = ({ postId }) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
    } catch (e) {
      console.log("[CommentList - getComments]", e);
    }
  };

  return (
    <List primaryKey="content" border={false} margin={{ top:'none', bottom: "medium" }} data={comments} />
  );
};

export default CommentList;
