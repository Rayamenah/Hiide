import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "../Context/Auth"
//icons
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
//components
import { Button, Flex, FormControl, FormLabel, Grid, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
//Firebase
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithRedirect
} from "firebase/auth"
import { authenticate } from "../Utils/firebaseConfig"
// import errorCodesMap from "../Utils/firebase.errorCodes";


interface Props {
    isNewUser?: boolean
}

const Authentication = (props: Props) => {
    const { isNewUser = false } = props;
    const [form, setForm] = useState({
        email: "",
        password: "",
        showPassword: false,
        submitting: false,
        forgotPassword: false,
        isNewUser: isNewUser
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { signedIn } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();



    const googleLogin = async () => {
        try {
            if (!signedIn) {
                const auth = getAuth()
                await signInWithRedirect(auth, googleProvider)
                toast({
                    title: "signed in",
                    description: "",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log('google sign in error', error)
        }

    }
    const emailAuth = async (e: any) => {
        e.preventDefault()
        setForm({ ...form, submitting: true })
        const auth = authenticate
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
            console.log('sign up error', error)
            setForm({ ...form, submitting: false })
            toast({
                title: "Error",
                description: "something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    }


    const forgotPassword = async (e: any) => {
        e.preventDefault()
        const auth = authenticate
        setForm({ ...form, submitting: true })

        try {
            await sendPasswordResetEmail(auth, form.email);
            toast({
                title: "Email sent",
                description: "check your inbox for a password reset link",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });

        } finally {
            setForm({ ...form, submitting: false })
        }
    };

    const ModalHeading = () => {
        if (form.isNewUser && !form.forgotPassword) {
            return "Create Account"
        } else if (form.forgotPassword) {
            return "Reset password"
        } else {
            return "Sign in"
        }
    };


    return (
        <Flex p="4" mt="10"
            justifyContent={"center"}>
            <Grid rowGap={3}>
                <Button fontSize='9pt' width={"15rem"} leftIcon={<FcGoogle />} onClick={googleLogin}>
                    Sign in with Google
                </Button>

                <Button fontSize='9pt' width={"15rem"} leftIcon={<AiTwotoneMail />} onClick={onOpen}>
                    Sign in with Email
                </Button>
            </Grid>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent paddingBottom={"2rem"}>
                    <ModalHeader>{ModalHeading()}</ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        {!form.forgotPassword &&
                            <Flex
                                onSubmit={emailAuth}
                                flexDirection={"column"}
                                rowGap={"1rem"}
                                as="form"
                            >
                                <FormControl isRequired>
                                    <FormLabel fontSize='10pt'>Email</FormLabel>

                                    <Input
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        value={form.email}
                                        fontSize='9pt'
                                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value, }
                                        ))} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel fontSize='10pt'>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={form.showPassword ? "text" : "password"}
                                            fontSize='9pt'
                                            placeholder="john.doe@example.com"
                                            value={form.password}
                                            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }
                                            ))} />
                                        <InputRightElement width="3rem">
                                            <Button
                                                bgColor='transparent'
                                                _hover={{ bgColor: 'transparent' }}
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

                                <Button type="submit"
                                    isLoading={form.submitting}
                                    loadingText="submitting"
                                    colorScheme="facebook"
                                    fontSize='9pt'>
                                    Submit
                                </Button>
                            </Flex>
                        }
                        {form.forgotPassword && (
                            <Flex
                                onSubmit={forgotPassword}
                                flexDirection={"column"}
                                rowGap={"1rem"}
                                as="form"
                            >
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        fontSize='9pt'
                                        placeholder="e.g. john.doe@example.com"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                </FormControl>

                                <Button
                                    isLoading={form.submitting}
                                    loadingText={"Submitting"}
                                    type="submit"
                                    fontSize='9pt'>
                                    Submit
                                </Button>
                            </Flex>
                        )}
                        <Flex
                            flexWrap={"wrap"}
                            rowGap={"1rem"}
                            justifyContent={"space-between"}
                            mt={"1rem"}
                        >
                            <Button
                                variant={"link"}
                                fontSize='10'
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

                            {!form.forgotPassword && <Button
                                variant={"link"}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isNewUser: !prev.isNewUser,
                                    }))
                                }
                                fontSize='10'
                            >
                                {form.isNewUser
                                    ? "Do you have an existing account ?"
                                    : "No account ?"}
                            </Button>}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex >
    )
}
export default Authentication