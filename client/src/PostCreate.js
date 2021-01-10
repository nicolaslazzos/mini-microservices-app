import React from "react";
import axios from "axios";
import { Form, FormField, TextInput, Box, Button, Heading } from "grommet";

const PostCreate = () => {
  const initialState = { title: "" };
  const [formData, setFormData] = React.useState({ ...initialState });

  const onSubmit = async ({ value }) => {
    try {
      await axios.post("http://localhost/posts/create", value);

      setFormData({ ...initialState });
    } catch (e) {
      console.log("[PostCreate - onSubmit]", e.message);
    }
  };

  return (
    <Form
      value={formData}
      onChange={(data) => setFormData(data)}
      onSubmit={onSubmit}
    >
      <Heading margin={{ bottom: "small" }}>Create a Post</Heading>
      <FormField name="title" htmlfor="title" label="Title">
        <TextInput id="title" name="title" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Create" />
      </Box>
    </Form>
  );
};

export default PostCreate;
