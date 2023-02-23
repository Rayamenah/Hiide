import { Box, Flex, Text, Spacer, Button } from "@chakra-ui/react"
import DarkMode from "./DarkMode"

const Header = () => {
    return (
        <>
            <Box w="100" >
                <Flex align="true">
                    <Box>
                        <Text fontSize="2xl" as="b">H i i d e</Text>
                    </Box>
                    <Spacer />
                    <Flex gap="4">
                        <Button variant="outline" colorScheme="blue">CONTACT US</Button>
                        <DarkMode />
                    </Flex>

                </Flex >
            </Box >
        </>
    )
}

export default Header