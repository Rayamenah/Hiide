import { Button, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { authenticate } from "../Utils/firebaseConfig";


const SignOut = () => {
    const toast = useToast()
    const logout = async () => {
        const auth = authenticate;
        await auth.signOut();
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
            <Text display={{ base: "none", lg: "block" }}>Sign out</Text>
        </Button>
    );
}

export default SignOut;