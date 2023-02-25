import { Button, useColorMode } from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";



function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button
            size={"sm"}
            aria-label="night mode switch"
            onClick={toggleColorMode}
        >
            {colorMode === "light" ? <BsMoon /> : <BsSun />}
        </Button>
    );
}

export default DarkMode;