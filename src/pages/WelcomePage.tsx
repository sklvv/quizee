import {
  Box,
  Button,
  Center,
  Container,
  Highlight,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const nav = useNavigate();
  const createNewHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    nav("/create");
  };
  return (
    <Center h="90%">
      <Container maxW={"md"}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
          border="1px"
          borderColor="chakra-border-color"
          shadow="sm"
          borderRadius="xl"
          p="10"
        >
          <Text mb={"6"} fontSize="4xl" as="b">
            <Highlight
              query="Quizee"
              styles={{
                px: "2",
                py: "1",
                padding: "2",
                rounded: "full",
                bg: "purple.500",
                color: "white",
              }}
            >
              Welcome back to Quizee
            </Highlight>
          </Text>
          <Button
            colorScheme={"purple"}
            variant={"solid"}
            mb="4"
            onClick={e => createNewHandler(e)}
          >
            Create new Quizee
          </Button>
          <Button colorScheme={"purple"} variant={"outline"}>
            Take a Quizee
          </Button>
        </Box>
      </Container>
    </Center>
  );
};

export default WelcomePage;
