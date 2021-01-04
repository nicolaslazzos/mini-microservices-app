import React from "react";
import { List } from "grommet";

const CommentList = ({ comments }) => {
  return (
    <List
      primaryKey="content"
      border={false}
      margin={{ top: "none", bottom: "medium" }}
      data={comments.map((comment) => {
        const { status } = comment;

        if (status === "pending") {
          return { ...comment, content: "Awating for comment moderation..." };
        } else if (status === "rejected") {
          return { ...comment, content: "This comment was rejected..." };
        } else if (status === "approved") {
          return comment;
        }
      })}
    />
  );
};

export default CommentList;
