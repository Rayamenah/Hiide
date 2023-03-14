import { Link, Flex, Text, } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa"

const Footer = () => {

    return (
        <Flex
            bgColor="gray.700"
            position={"fixed"}
            bottom={"-12px"}
            justifyContent={"center"}
            alignItems={"center"}
            mb="1.5rem"
            top={{ base: "96%", lg: "96%" }}
            left={{ base: "50%", lg: "50%" }}
            transform={{ base: "translate(-50%, -50%)", lg: "translate(-50%, -50%)" }}
            flexDirection={"column"}
            fontSize={{ base: "sm", lg: "md" }}
            zIndex={100}
            width={"100vw"}
            height={"75px"}
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