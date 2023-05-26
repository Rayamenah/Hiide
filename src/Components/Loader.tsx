import { Box, Text, useColorMode } from "@chakra-ui/react";
import { ThreeCircles } from "react-loader-spinner";

interface Props { }

function FullPageLoader(props: Props) {
    const { } = props;

    const { colorMode } = useColorMode();

    return (
        <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={1000}
            bg={colorMode === "light" ? "white" : "gray.800"}
            display="flex"
            flexDir={"column"}
            alignItems="center"
            justifyContent="center"
            height={"100dvh"}
        >
            <Text fontSize={"lg"}>Hiide</Text>

            <ThreeCircles
                height="25"
                width="25"
                color="#091020"
                ariaLabel="three-circles-rotating"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </Box>
    );
}

export default FullPageLoader;
