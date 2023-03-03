import NextLink from "next/link";
import { Box, Flex, Text, Spacer, Button, useToast } from "@chakra-ui/react"
import DarkMode from "./DarkMode"
import SignOut from "./SignOut"
import { useAuth } from "../Context/Auth";
import { FaShare } from "react-icons/fa"
import { copyTextToClipboard } from "../Utils/copyToClipboard"


const Header = () => {
    const toast = useToast()
    const { signedIn, username } = useAuth()
    const url = `https://anony-app.vercel.app/${username}`

    const ShareLink = async () => {
        copyTextToClipboard(url)
        toast({
            title: "link copied",
            description: "now share to your friends",
            duration: 300,
            status: "success",
            isClosable: true
        })

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
        }
    }

    return (
        <>
            <Box w="100" >
                <Flex align="true">
                    <Box>
                        <NextLink href={"/"}>                        <Text fontSize="2xl" as="b">H i i d e</Text>
                        </NextLink>
                    </Box>
                    <Spacer />
                    <Flex gap="4" align={"center"}>
                        {username && <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            leftIcon={<FaShare />}
                            onClick={ShareLink}>Share Link</Button>
                        }
                        {signedIn && <SignOut />}
                        <DarkMode />
                    </Flex>
                </Flex >
            </Box >

        </>
    )
}

export default Header



