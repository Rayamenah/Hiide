import { getAuth, getRedirectResult } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../src/Context/Auth";
import { Db } from "../src/Utils/firebaseConfig";
import useWindowSize from "../src/Utils/hooks/useWindowSize";
import {
    Box,
    Button,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import Authentication from "../src/Components/Authentication";
import Footer from "../src/Components/Footer";
import Header from "../src/Components/Header";

const SendMessage = () => {
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { signedIn } = useAuth();
    const windowSize = useWindowSize();
    const [anonymousMsg, setAnonymousMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [footer, setFooter] = useState(true);
    const Character_Limit = 250;
    const userId = router.query.user as string;

    /// submit function

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

    // input function 
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
    }, [toast]);

    const HandleFocus = () => {
        if (windowSize.height < 650) {
            setFooter(false);
        }
    }

    const HandleBlur = () => {
        if (windowSize.height < 650) {
            setFooter(true);
        }
    }
    return (
        <>
            <Box w="100%" p="2" position='relative' height='100vh'>
                <Header />
                <Flex
                    flexDirection={"column"}
                    width={"100%"}
                    maxW={"500px"}
                    padding={"0.5rem"}
                    margin={"0 auto"}
                >
                    <Heading fontWeight={"medium"} size={"md"} mt="0.5rem" mb="0.5rem" as={"h1"}>
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
                            height={"200px"}
                            width={"100%"}
                            onFocus={HandleFocus}
                            onBlur={HandleBlur}
                            placeholder={`type a message for ${userId}`}
                            mb={"1rem"}
                            fontSize='9pt'
                        />
                        <Flex justifyContent="space-between">
                            <Text fontSize='9pt'>
                                <Box as="span">{anonymousMsg.length}</Box>/{Character_Limit}
                            </Text>
                            <Button
                                type="submit"
                                width="100px"
                                isLoading={submitting}
                                loadingText="sending"
                                fontSize='10pt'
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
                            <Authentication isNewUser />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}

export default SendMessage