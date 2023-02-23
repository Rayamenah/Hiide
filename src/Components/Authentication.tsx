import { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../Context/Auth"
//icons
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
//components
import { Box, Button, Flex, Grid, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
//Firebase
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithRedirect
} from "firebase/auth"
// import {firebaseApp} from  "../../Utils/firebaseConfig"

const Authentication = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { signedIn } = useAuth()
    const toast = useToast();
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    const [form, setForm] = useState({
        email: "",
        password: "",
        showPassword: false,
        submitting: false,
        forgotPassword: false,
        isNewUser: true
    });

    const GoogleLogin = () => {
        if (!signedIn) {
            const auth = getAuth()
            signInWithRedirect(auth, googleProvider)
        }
    }
    const EmailAuth = async (e: any) => {
        e.preventDefault()
        setForm({ ...form, submitting: true })
        const auth = getAuth()
        try {
            if (form.isNewUser) {
                await createUserWithEmailAndPassword(auth, form.email, form.password)
                toast({
                    title: "account created",
                    description: "check your inbox for a verification mail",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            } else {
                await signInWithEmailAndPassword(auth, form.email, form.password)
                router.push("/")
                toast({
                    title: "signed in",
                    description: "",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        } catch (error) {
            setForm({ ...form, submitting: false })
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }

    }

    const ModalHeading = () => {
        if (form.isNewUser) {
            return "Create Account"
        } else {
            return "Sign In"
        }
    }


    return (
        <Box p="4" mt="10">
            <Grid rowGap={3}>
                <Button leftIcon={<FcGoogle />} onClick={GoogleLogin}>
                    Sign in with Google
                </Button>

                <Button leftIcon={<AiTwotoneMail />} onClick={onOpen}>
                    Sign in with Email
                </Button>
            </Grid>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent paddingBottom={"2rem"}>
                    <ModalHeader>{ModalHeading()}</ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            onSubmit={EmailAuth}
                            flexDirection={"column"}
                            rowGap={"1rem"}
                            as="form"
                        >
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>

                                <Input
                                    type="email"
                                    placeholder="johm.doe@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value, }
                                    ))} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={form.showPassword ? "text" : "password"}
                                        placeholder="john.doe@example.com"
                                        value={form.password}
                                        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }
                                        ))} />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    showPassword: !prev.showPassword,
                                                }))
                                            }
                                        >
                                            {form.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <Button type="submit"
                                    isLoading={form.submitting}
                                    loadingText="submitting"
                                    variant="outline"
                                    colorScheme="facebook"
                                >
                                    SUBMIT
                                </Button>
                            </FormControl>

                            <Button
                                variant={"link"}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        forgotPassword: !prev.forgotPassword,
                                    }))
                                }
                            >
                                {form.forgotPassword
                                    ? "Back to login"
                                    : "Forgot password ?"}
                            </Button>
                            <Button
                                variant={"link"}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isNewUser: !prev.isNewUser,
                                    }))
                                }
                            >
                                {form.isNewUser
                                    ? "Do you have an existing account ?"
                                    : "No account?"}
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box >
    )
}
export default Authentication