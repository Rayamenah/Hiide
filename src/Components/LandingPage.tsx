import { Stack, Text } from "@chakra-ui/react";

const LandingPage = () => {
    return (
        <>
            <Stack direction="column" mt="70px" color="blue.600">
                <Text
                    as="b"
                    fontSize={{ base: '3xl', sm: "4xl", lg: '5xl' }}>
                    Send
                </Text>
                <Text
                    as="b"
                    fontSize={{ base: '3xl', sm: "4xl", lg: '5xl' }}>
                    Anonymous
                </Text>
                <Text
                    as="b"
                    fontSize={{ base: '3xl', sm: "4xl", lg: '5xl' }}
                >Messages
                </Text>
            </Stack>
        </>
    )
}

export default LandingPage