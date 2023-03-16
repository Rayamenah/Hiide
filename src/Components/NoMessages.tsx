import { Box, Flex, Text, Button, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../Context/Auth";
import Username from "./Username";

interface Props {
}

function NoMessagesView(props: Props) {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { username } = useAuth();
    const toast = useToast();
    const url = `https://anony-app.vercel.app/${username}`;



    const shareLink = async () => {

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "",
                    text: "send me an anonymous message and i wont know who sent them",
                    url: url
                })
            } catch (error) {
                toast({
                    title: "something went wrong",
                    description: "sharing failed!",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            }
        }
    }



    return (
        <Flex width={"100%"} height={"70vh"} justifyContent={"center"} alignItems={"center"}>
            <Box>
                <Text textAlign={"center"} fontSize={"sm"} mb="4">
                    Oops! 😅 No one has sent you a message. Create your username, share your profile URL and check
                    back later again!
                </Text>
                {!username ? (
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Button
                            bg={"#0D67FF"}
                            colorScheme={"facebook"}
                            textColor={"white"}
                            onClick={onOpen}
                        >
                            Create your username
                        </Button>
                    </Flex>
                ) : (
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Button
                            bg={"#0D67FF"}
                            colorScheme={"blue"}
                            textColor={"white"}
                            leftIcon={<FaShare />}
                            onClick={shareLink}
                        >

                            <Flex
                                columnGap={"5px"}
                                alignItems={"center"}
                                display={{ base: "flex", lg: "none" }}
                            >
                                <Text>Share your link</Text>

                            </Flex>
                        </Button>
                    </Flex>
                )
                }
            </Box>

            <Username isOpen={isOpen} onClose={onClose} />

        </Flex >
    );
}

export default NoMessagesView;
