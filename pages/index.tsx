import Head from 'next/head'
import { Box } from "@chakra-ui/react";
//components
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";
import LandingPage from "../src/Components/LandingPage";
import Authentication from "../src/Components/Authentication";
import VerifyEmail from "../src/Components/VerifyEmail";
import Messages from "../src/Components/Messages"
import { useAuth } from "../src/Context/Auth";



export default function Home() {
  const { user, signedIn, loading, setLoading } = useAuth()
  return (
    <>
      <Head>
        <title>Hiide</title>
        <meta name="description" content="send anonymous messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" p="6" px="12">
        <Header />

        {!signedIn &&
          <Box>
            <LandingPage />
            <Authentication />
          </Box>}

        {signedIn && !user.emailVerified && <VerifyEmail />}

        {signedIn && user.emailVerified && <Messages />}
      </Box >
      <Footer />
    </>
  )
}
