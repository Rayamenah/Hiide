import NextLink from "next/link";
import { Box, Flex, Text, Spacer, Button, useToast, useDisclosure } from "@chakra-ui/react";
import DarkMode from "./DarkMode";
import SignOut from "./SignOut";
import Username from "./Username";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Db } from "../Utils/firebaseConfig"
import { useAuth } from "../Context/Auth";
import { FaShare } from "react-icons/fa";
import { copyTextToClipboard } from "../Utils/copyToClipboard";
import { useEffect } from "react";


const Header = () => {
    const toast = useToast();
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { user, signedIn, username, setUsername } = useAuth();
    const url = `https://anony-app.vercel.app/${username}`;

    useEffect(() => {
        const findUsername = async () => {
            if (user?.email) {
                const name = query(collection(Db, "anonymous-msgs"), where("email", "==", user.email));
                try {
                    const docSnap = await getDocs(name)
                    const signedUser = docSnap?.docs[0]?.data()?.username;
                    setUsername(signedUser)
                } catch (error) {
                    toast({
                        title: "something went wrong",
                        description: "create your username",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    })
                }
            }
        }
        findUsername()

    }, [setUsername, toast, user?.email])

    const ShareLink = async () => {

        if (username) {
            copyTextToClipboard(url)

            toast({
                title: "link copied",
                description: "now share to your friends",
                duration: 3000,
                status: "success",
                isClosable: true
            });

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "send me an anonymous message",
                        text: "i wont know who sent them",
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
            } else {
                onOpen()
            }
        }


    }

    return (
        <>
            <Box w="100" >
                <Flex align="true">
                    <Box>
                        <NextLink href={"/"}>
                            <Text fontSize="2xl" as="b">H i i d e</Text>
                        </NextLink>
                    </Box>
                    <Spacer />
                    <Flex gap="4" align={"center"}>
                        {username && <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            leftIcon={username ? <FaShare /> : undefined}
                            onClick={ShareLink}
                        >
                            {username ? "share link" : "create username"}
                        </Button>}
                        {signedIn && <SignOut />}
                        <DarkMode />
                    </Flex>
                </Flex >

                <Username isOpen={isOpen} onClose={onClose} />

            </Box >

        </>
    )
}

export default Header



