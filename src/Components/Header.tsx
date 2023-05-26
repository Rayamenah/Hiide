import { Box, Button, Flex, Spacer, Text, useToast, } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import NextLink from "next/link";
import { useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../Context/Auth";
import { copyTextToClipboard } from "../Utils/copyToClipboard";
import { Db } from "../Utils/firebaseConfig";
import DarkMode from "./DarkMode";
import SignOut from "./SignOut";


const Header = () => {
    const toast = useToast();
    const { user, signedIn, username, setUsername } = useAuth();
    const url = `https://hiide.vercel.app/${username}`;

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
                        title: "",
                        text: "feel free to send me an anonymous message",
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
                            share link
                        </Button>}
                        {signedIn && <SignOut />}
                        <DarkMode />
                    </Flex>
                </Flex >
            </Box >

        </>
    )
}

export default Header



