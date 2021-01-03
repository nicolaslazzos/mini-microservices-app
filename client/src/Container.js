import React from "react";
import { Box } from "grommet";

const Container = ({ children }) => {
  return (
    <Box pad="medium" width="large" alignSelf="center">
      {children}
    </Box>
  );
};

export default Container;
