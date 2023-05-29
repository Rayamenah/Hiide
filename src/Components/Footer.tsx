import { Flex, Link, Text, useColorMode, Icon } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const { colorMode } = useColorMode();

    return (
        <Flex
            position='absolute'
            bgColor={colorMode === "light" ? 'white' : '#1a202c'}
            color={colorMode === "light" ? 'blue.600' : 'white'}
            justifyContent={"center"}
            alignItems={"center"}
            bottom={0}
            left={0}
            flexDirection={"column"}
            fontSize={{ base: "sm", lg: "md" }}
            zIndex={100}
            width={"100%"}
            height={"70px"}
        >
            <Text fontSize='9pt'>
                © {new Date().getFullYear()} Hiide - Send Anonymous Messages
            </Text>
            <Flex justify="space-between" gap={2} flexWrap={"wrap"} align="center">
                <Text fontSize='9pt'>Built and designed by Raymond </Text>
                <Flex gap='2'>
                    <Link
                        color={"black"}
                        href="https://github.com/RaymondAmenah">
                        <Icon as={FaGithub} fontSize='9pt' />
                    </Link>{" "}

                    <Link
                        color={"blue.600"}
                        href="https://twitter.com/JamesRhaymond"
                    >
                        <Icon as={FaTwitter} fontSize='9pt' />
                    </Link>{" "}
                </Flex>
            </Flex>
        </Flex >
    )
}

export default Footer 