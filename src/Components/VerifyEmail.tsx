import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { User, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../Context/Auth";
import { authenticate } from "../Utils/firebaseConfig";


const VerifyEmail = () => {
    const toast = useToast();
    const auth = authenticate;
    const router = useRouter();
    const { user } = useAuth();

    user.emailVerified && router.push("/")


    const HandleEmailVerification = async () => {
        try {
            const user: User | null = auth.currentUser;
            if (user !== null) {
                await sendEmailVerification(user);
                toast({
                    title: "Email verification sent",
                    description: "check your inbox for more details",
                    status: "success",
                    duration: 3000
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "something went wrong",
                status: "error",
                duration: 3000
            })
        }
    }


    return (
        <Box padding={"2rem"} height={"100dvh"}>

            <Flex
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Flex
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mb={"1rem"}
                >
                    <Box>
                        <Heading fontWeight={"medium"} size={"lg"} mb="0.5rem" as={"h1"}>
                            Thank you for signing up!
                        </Heading>
                        <Text>Please verify your email before proceeding</Text>
                    </Box>

                </Flex>
                <Button onClick={HandleEmailVerification}>Send Verification Email</Button>
            </Flex>
        </Box>
    )
}
export default VerifyEmail