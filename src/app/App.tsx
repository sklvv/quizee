import { Container } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "../pages";

function App() {
  return (
    <Container maxW={"container.xl"} style={{ height: "100vh" }}>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
