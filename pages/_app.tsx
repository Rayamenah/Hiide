import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react"
import Auth from "../src/Context/Auth"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ChakraProvider>
  )
}


