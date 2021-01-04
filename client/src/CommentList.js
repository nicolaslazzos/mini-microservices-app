import React from "react";
import { List } from "grommet";

const CommentList = ({ comments }) => {
  return (
    <List
      primaryKey="content"
      border={false}
      margin={{ top: "none", bottom: "medium" }}
      data={comments}
    />
  );
};

export default CommentList;
