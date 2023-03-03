import { Stack, Text } from "@chakra-ui/react"

const LandingPage = () => {
    return (
        <>
            <Stack direction="column" mt="12" color="blue.600">
                <Text as="b" fontSize="5xl">Send</Text>
                <Text as="b" fontSize="5xl">Anonymous</Text>
                <Text as="b" fontSize="5xl">Messages</Text>
            </Stack>
        </>
    )
}

export default LandingPage