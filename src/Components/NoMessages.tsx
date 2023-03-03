import { Box, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../Context/Auth"
import Username from "./Username"

interface Props {
}

function NoMessagesView(props: Props) {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { username } = useAuth()
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
                            Create your Username
                        </Button>
                    </Flex>
                ) : (
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Button
                            bg={"#0D67FF"}
                            colorScheme={"blue"}
                            textColor={"white"}
                            leftIcon={<FaShare />}
                        // onClick={shareLink}
                        >
                            <Text display={{ base: "none", lg: "block" }}>Share your link</Text>

                            <Flex
                                columnGap={"5px"}
                                alignItems={"center"}
                                display={{ base: "flex", lg: "none" }}
                            >
                                <Text>Share your link</Text>
                                <FaShare />
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
