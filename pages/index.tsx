import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { load } from "../src/func";

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>("");
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddressAccount] = React.useState<any>(null);

  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any>([]);

  const handleInputChange = (e: any) => {
    setInput(e.currentTarget.value);
  };

  const handleAddTask = async () => {
    await contract.createTask(input, { from: addressAccount });
    setInput("");
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, { from: addressAccount });
    setRefresh(true);
  };

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((data) => {
      setAddressAccount(data.addressAccount);
      setContract(data.todoContract);
      setTasks(data.tasks);
    });
  }, [refresh]);

  return (
    <VStack>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Blockchain TodoList." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack w="full">
        <Spacer />
        <VStack>
          <Heading>Blockchain TodoList</Heading>
          <Box h="30px" />
          <HStack w="md">
            <Input
              type="text"
              size="md"
              placeholder="New Task..."
              onChange={handleInputChange}
              value={input}
            />
            <Button onClick={handleAddTask} bg="green.200">
              ADD
            </Button>
          </HStack>
          <Box h="30px" />
          <Text>ToDO</Text>
          {tasks == null ? (
            <Spinner />
          ) : (
            tasks.map((task: any, idx: number) =>
              !task[2] ? (
                <HStack key={idx} w="md" bg="gray.100" borderRadius={7}>
                  <Box w="5px" />
                  <Text>{task[1]}</Text>
                  <Spacer />
                  <Button
                    bg="green.300"
                    onClick={() => handleToggled(task[0].toNumber())}
                  >
                    DONE
                  </Button>
                </HStack>
              ) : null
            )
          )}
          <Box h="10px" />
          <Text>Tasks done</Text>
          {tasks == null ? (
            <Spinner />
          ) : (
            tasks.map((task: any, idx: number) =>
              task[2] ? (
                <HStack key={idx} w="md" bg="gray.100" borderRadius={7}>
                  <Box w="5px" />
                  <Text>{task[1]}</Text>
                  <Spacer />
                  <Button
                    bg="red.300"
                    onClick={() => handleToggled(task[0].toNumber())}
                  >
                    UNDONE
                  </Button>
                </HStack>
              ) : null
            )
          )}
        </VStack>
        <Spacer />
      </HStack>
    </VStack>
  );
};

export default Home;
