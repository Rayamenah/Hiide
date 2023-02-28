import { Heading, Box, Stack, Text, ButtonGroup, Button } from "@chakra-ui/react"
import { useAuth } from "../Context/Auth";

const LandingPage = () => {

    const { user } = useAuth()
    return (
        <>
            <Heading fontWeight={"medium"} size={"lg"} as={"h1"} mb="0.5rem" mt="4">
                Hi {user?.displayName}, Welcome to Hiide
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