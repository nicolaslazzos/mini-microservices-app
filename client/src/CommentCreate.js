import React from "react";
import axios from "axios";
import { Form, FormField, TextInput, Box, Button, Heading } from "grommet";

const CommentCreate = ({ postId }) => {
  const initialState = { content: "" };
  const [formData, setFormData] = React.useState({ ...initialState });

  const onSubmit = async ({ value }) => {
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, value);

      setFormData({ ...initialState });
    } catch (e) {
      console.log("[CommentCreate - onSubmit]", e);
    }
  };

  return (
    <Form
      value={formData}
      onChange={(data) => setFormData(data)}
      onSubmit={onSubmit}
    >
      <FormField name="comment" htmlfor="content" label="Comment">
        <TextInput id="content" name="content" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Comment" />
      </Box>
    </Form>
  );
};

export default CommentCreate;
