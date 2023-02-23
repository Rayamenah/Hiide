import { Heading, Box, Stack, Text, ButtonGroup, Button } from "@chakra-ui/react"

const LandingPage = () => {
    return (
        <>
            <Heading fontWeight={"medium"} size={"lg"} mb="0.5rem" as={"h1"} mt="6">
                Welcome to Hiide
            </Heading>
            <Stack direction="column" mt="12" color="blue.600">
                <Text as="b" fontSize="5xl">Send</Text>
                <Text as="b" fontSize="5xl">Anonymous</Text>
                <Text as="b" fontSize="5xl">Messages</Text>
                <Text as="i" fontSize="xl"> and i wont know who sent them... </Text>
            </Stack>
        </>
    )
}

export default LandingPage