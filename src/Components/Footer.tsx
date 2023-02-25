import { Link, Flex, Text, } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa"

const Footer = () => {

    return (
        <Flex
            position={"fixed"}
            bottom={"-10px"}
            justifyContent={"center"}
            alignItems={"center"}
            mb="2rem"
            top={{ base: "96%", lg: "96%" }}
            left={{ base: "50%", lg: "50%" }}
            transform={{ base: "translate(-50%, -50%)", lg: "translate(-50%, -50%)" }}
            flexDirection={"column"}
            fontSize={{ base: "sm", lg: "md" }}
            zIndex={100}
            width={"100vw"}
            height={"70px"}
        >
            <Text>
                © {new Date().getFullYear()} Hiide - Send Anonymous Messages
            </Text>
            <Flex justifyContent={"space-between"} gap="4" flexWrap={"wrap"} alignItems={"center"}>
                <Text pr={"3px"}>Built and designed Raymond </Text>
                <Link
                    color={"black"}
                    pr={"3px"}
                    href="https://github.com/RaymondAmenah">
                    <FaGithub />
                </Link>{" "}

                <Link
                    color={"blue.600"}
                    pr={"3px"}
                    href="https://twitter.com/RhaymondJames"
                >
                    <FaTwitter />
                </Link>{" "}
            </Flex>
        </Flex>
    )
}

export default Footer 