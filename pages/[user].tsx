import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Db } from "../src/Utils/firebaseConfig";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useAuth } from "../src/Context/Auth"
import { collection, query, addDoc, getDocs, where } from "firebase/firestore"

import {
    Button,
    Heading,
    Box,
    Textarea,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Text,
} from "@chakra-ui/react";

import Header from "../src/Components/Header"
import Footer from "../src/Components/Footer";
import Authentication from "../src/Components/Authentication";

const SendMessage = () => {
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { signedIn, user, username } = useAuth();

    const [anonymousMsg, setAnonymousMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [footer, setFooter] = useState(true);
    const Character_Limit = 250;
    const userId = router.query.user as string;

    // console.log(anonymousMsg)

    ///////////// submit function

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true)
        if (anonymousMsg.trim().length === 0) {
            toast({
                title: "this field is empty",
                description: "enter a message",
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setSubmitting(false)
            return;
        } else if (anonymousMsg.trim().length > Character_Limit) {
            toast({
                title: "Message too long!",
                description: "Please enter a message less than 250 characters",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setSubmitting(false)
            return;
        }

        //query the database to check if a user is registered with this username
        const q = query(collection(Db, "anonymous-msgs"), where("username", "==", userId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            toast({
                title: "User does not exist!",
                description: "There's no such user with this username. Please check that you used the right link",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setSubmitting(false);
            return;
        }
        //if user exists send the message
        try {
            const userEmail = querySnapshot?.docs[0]?.data()?.email;
            await addDoc(collection(Db, "anonymous-msgs", userEmail, "messages"), {
                message: anonymousMsg,
                created_at: new Date()
            })
        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }

        setSubmitting(false)


        if (!signedIn) {
            onOpen()
        } else {
            toast({
                title: "Message sent!",
                description: "Your message has been sent successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

        setAnonymousMsg("")
    }

    /////////////// input function 
    const HandleInput = (e: any) => {
        const value = e.target.value
        if (value.length <= Character_Limit) {
            setAnonymousMsg(value)
        }
    }

    useEffect(() => {
        const auth = getAuth();
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }, [username, toast]);

    const HandleFocus = () => {

    }

    const HandleBlur = () => {

    }


    return (
        <>
            <Box w="100%" p="4" px="8">
                <Header />
                <Flex
                    flexDirection={"column"}
                    width={"100%"}
                    maxW={"500px"}
                    padding={"1rem"}
                    margin={"0 auto"}
                >
                    <Heading fontWeight={"medium"} size={"md"} mb="0.5rem" as={"h1"}>
                        send
                        <Box px={"5px"} as="span" color="blue.700">
                            {userId}
                        </Box>
                        an anonymous message
                    </Heading>

                    <Box as="form" onSubmit={HandleSubmit}>
                        <Textarea
                            maxLength={250}
                            display={"block"}
                            value={anonymousMsg}
                            onChange={HandleInput}
                            height={"250px"}
                            width={"100%"}
                            onFocus={HandleFocus}
                            onBlur={HandleBlur}
                            placeholder={`type a message for ${userId}`}
                            mb={"1rem"}
                        />
                        <Flex justifyContent="space-between">
                            <Text>
                                <Box as="span">{anonymousMsg.length}</Box>/{Character_Limit}
                            </Text>
                            <Button
                                bg={"#0D67FF"}
                                type="submit"
                                width="100px"
                                isLoading={submitting}
                                loadingText="sending"
                            >
                                Send
                            </Button>
                        </Flex>
                    </Box>
                </Flex>

                {footer && <Footer />}

                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent paddingBottom={"2rem"}>
                        <ModalHeader>{userId} has received your message</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mb={"1.5rem"}>Now create your account</Text>
                            <Authentication newUser />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}

export default SendMessage