import { Link, Flex, Text, } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa"

const Footer = () => {

    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            mb="0.5rem"
            flexDirection={"column"}
            fontSize={{ base: "sm", lg: "md" }}
            zIndex={100}
            width={"100%"}
            height={"70px"}
        >
            <Text>
                © {new Date().getFullYear()} Hiide - Send Anonymous Messages
            </Text>
            <Flex justifyContent={"space-between"} gap="4" flexWrap={"wrap"} alignItems={"center"}>
                <Text pr={"3px"}>Built and designed by Raymond </Text>
                <Link
                    color={"black"}
                    pr={"3px"}
                    href="https://github.com/RaymondAmenah">
                    <FaGithub />
                </Link>{" "}

                <Link
                    color={"blue.600"}
                    pr={"3px"}
                    href="https://twitter.com/JamesRhaymond"
                >
                    <FaTwitter />
                </Link>{" "}
            </Flex>
        </Flex>
    )
}

export default Footer 