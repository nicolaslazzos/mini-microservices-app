import React from "react";
import axios from "axios";
import { Heading, Card, CardHeader, CardBody } from "grommet";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4002/posts");
      setPosts(res.data);
    } catch (e) {
      console.log("[PostList - getPosts]", e.message);
    }
  };

  return (
    <>
      <Heading margin={{ bottom: "medium" }}>Posts</Heading>
      {posts.map(({ title, id, comments }) => {
        return (
          <Card key={id} background="light-1" margin={{ bottom: "small" }}>
            <CardHeader pad="medium">
              <Heading size="small" margin="none">
                {title}
              </Heading>
            </CardHeader>
            <CardBody
              pad={{
                top: "none",
                left: "medium",
                right: "medium",
                bottom: "medium",
              }}
            >
              <CommentList comments={comments} />
              <CommentCreate postId={id} />
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default PostList;
