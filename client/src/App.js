import { Grommet, Box } from "grommet";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import AppBar from "./AppBar";
import Container from "./Container";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Box>
        <AppBar title="Mini Microservices App" />
        <Container>
          <PostCreate />
          <PostList />
        </Container>
      </Box>
    </Grommet>
  );
}

export default App;
