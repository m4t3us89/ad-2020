import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  Divider,
  Box,
  IconButton,
  Flex,
  Button,
  Text,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/core";
import api from "../services/api";

export default function Person() {
  const router = useRouter();
  const toast = useToast();
  const inputNameRef = useRef(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  useEffect(function(){inputNameRef.current.focus()},[])

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("person", { name, email });
      handleToast("Participante adicionado.", "", "success");
      setName("");
      setEmail("");
      inputNameRef.current.focus()
    } catch (error) {
      const message = error.response.data.message.toString();
      handleToast(message, "", "warning");
    }
  }

  function handleToast(title, description, status) {
    toast({
      position: "top",
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Box>
      {" "}
      <Flex align="center" gridGap="2" marginBottom="5">
        <IconButton
          variant="outline"
          variantColor="teal"
          icon="arrow-back"
          size="sm"
          onClick={() => router.push("/")}
        />
        <Text fontSize="lg">Adicionar Participante</Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input
            ref={inputNameRef}
            placeholder="Nome"
            size="sm"
            value={name}
            onChange={handleChangeName}
          />
          <Input
            placeholder="Email"
            size="sm"
            value={email}
            onChange={handleChangeEmail}
          />
          <Button type="submit" variantColor="teal" size="sm" w="100%">
            ADICIONAR
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
