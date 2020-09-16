import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Divider,
  Box,
  IconButton,
  Flex,
  Button,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/core";
import api from "./../services/api";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const [loadingDraw, setLoadingDraw] = useState(false);
  const [people, setPeople] = useState();

  useEffect(function () {
    getPeoples();
  }, []);

  async function getPeoples() {
    const ret = await api.get("person");
    console.log(ret.data);
    setPeople(ret.data);
  }

  async function handleDraw() {
    setLoadingDraw(true);
    try {
      await api.put("person/draw");
      handleToast(
        "O sorteio foi realizado com sucesso. Cada participante irá receber via E-mail o seu amigo secreto.",
        "",
        "success"
      );
      setLoadingDraw(false);
    } catch (error) {
      handleToast(error.response.data.message, "", "warning");
      setLoadingDraw(false);
    }
  }

  async function handleDeletePerson(idPerson) {
    try {
      await api.delete(`person/${idPerson}`);
      handleToast("Participante removido.", "", "success");
      getPeoples();
    } catch (error) {
      handleToast(error.response.data.message, "", "warning");
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
      <Flex align="center" gridGap="2">
        <IconButton
          variant="outline"
          variantColor="teal"
          icon="add"
          size="sm"
          isDisabled={loadingDraw}
          onClick={() => router.push("people")}
        />
        <Text fontSize="lg">Participantes</Text>
      </Flex>
      {people  ? (
        <>
          {people.length > 0 ?
            <Box marginTop="5">
              {people.map((person, index) => (
                <Box key={index}>
                  <Flex justify="space-between">
                    <Text fontSize="md">{person.name}</Text>
                    <Box>
                      {/*<IconButton
                        isDisabled={loadingDraw}
                        variant="outline"
                        variantColor="teal"
                        icon="edit"
                        marginX="2"
                        size="sm"
                      />*/}
                      <IconButton
                        isDisabled={loadingDraw}
                        variant="outline"
                        variantColor="red"
                        icon="delete"
                        size="sm"
                        onClick={() => handleDeletePerson(person._id)}
                      />
                    </Box>
                  </Flex>
                  <Divider key={index} borderColor="white" />
                </Box>
              ))}
          
              <Button
                variantColor="teal"
                size="sm"
                w="100%"
                onClick={handleDraw}
                isDisabled={loadingDraw}
              >
                {!loadingDraw ? (
                  "SORTEAR"
                ) : (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                  />
                )}
              </Button>
            </Box>
           : (<Text fontSize="sm">Não há Participantes cadastrados.</Text>)}
        </>
      ) : (
         <Text fontSize="sm">Aguarde...</Text>
      )}
    </Box>
  );
}
