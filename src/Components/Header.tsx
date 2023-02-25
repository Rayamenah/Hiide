import { Box, Flex, Text, Spacer, Button } from "@chakra-ui/react"
import DarkMode from "./DarkMode"
import SignOut from "./SignOut"
import { useAuth } from "../Context/Auth";
import { useRouter } from "next/router"


const Header = () => {
    const router = useRouter()
    const { signedIn } = useAuth()
    return (
        <>
            <Box w="100" >
                <Flex align="true">
                    <Box>
                        <Text fontSize="2xl" as="b">H i i d e</Text>
                    </Box>
                    <Spacer />
                    <Flex gap="4" align={"center"}>
                        <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => (router.push("/Contact"))}>CONTACT US</Button>
                        {signedIn && <SignOut />}
                        <DarkMode />
                    </Flex>
                </Flex >
            </Box >
        </>
    )
}

export default Header



