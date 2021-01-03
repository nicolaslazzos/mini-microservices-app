import React from "react";
import { Header, Button, Text } from "grommet";
import { Home } from "grommet-icons";

const AppBar = ({ title }) => (
  <Header background="brand" justify="start">
    <Button icon={<Home />} hoverIndicator />
    <Text>{title}</Text>
  </Header>
);

export default AppBar;
