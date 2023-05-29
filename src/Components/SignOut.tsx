import { Button, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import { authenticate } from "../Utils/firebaseConfig";


const SignOut = () => {
    const toast = useToast()
    const router = useRouter()
    const logout = async () => {
        const auth = authenticate;
        await auth.signOut();
        router.push("/")
        toast({
            title: "signed out",
            description: "",
            status: "success",
            duration: 3000
        })

    };

    return (
        <Button
            size={"sm"}
            leftIcon={<CiLogout />}
            variant={"outline"}
            onClick={logout}>
            <Text display={{ base: "none", lg: "block" }} fontSize='8pt'>Sign out</Text>
        </Button>
    );
}

export default SignOut;