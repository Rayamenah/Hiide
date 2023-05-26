import { Box, Grid, useToast } from "@chakra-ui/react";
import Head from 'next/head';
import { useEffect, useState } from "react";
//components
import Authentication from "../src/Components/Authentication";
import Footer from "../src/Components/Footer";
import Header from "../src/Components/Header";
import LandingPage from "../src/Components/LandingPage";
import Loader from "../src/Components/Loader";
import Messages from "../src/Components/Messages";
import NoMessages from "../src/Components/NoMessages";
import VerifyEmail from "../src/Components/VerifyEmail";
import { useAuth } from "../src/Context/Auth";
//firebase
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Db } from "../src/Utils/firebaseConfig";



export default function Home() {
  type result = {
    id: string,
    message: string,
    created_at: {
      seconds: number,
      nanoseconds: number
    }
  };


  const toast = useToast()
  const { user, signedIn, loading, setLoading } = useAuth()
  const [anonMsg, setAnonMsg] = useState<result[]>([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      setLoader(true)
      if (user?.email) {
        const msg = collection(Db,
          "anonymous-msgs",
          user?.email,
          "messages")
        try {
          const q = query(msg, orderBy("created_at", "desc"))
          const docSnap = await getDocs(q)
          const messages = docSnap.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            created_at: doc.data().created_at
          }))

          setAnonMsg(messages)
          setLoader(false)

        } catch (error) {
          toast({
            title: "Error",
            description: "something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }

    fetchMessages()

  }, [user?.email, toast, setLoading])

  return (
    <>
      <Head>
        <title>Hiide</title>
        <meta name="description" content="send anonymous messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="100%" p="3">
        <Header />

        {!signedIn &&
          <Box overflowY={loading ? "hidden" : "visible"}>
            {loading && <Loader />}
            <LandingPage />
            <Authentication />
          </Box>}

        {signedIn && !user.emailVerified && <VerifyEmail />}

        {signedIn && user.emailVerified && anonMsg &&

          <Box>
            <Grid
              gridTemplateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              }}
              columnGap={"0.5rem"}
              rowGap={"0.3rem"}
            >
              {loader ? (
                <Loader />
              ) : (
                <>
                  {
                    anonMsg.map((msg: any) => (
                      <Messages
                        key={msg.id}
                        message={msg.message}
                        created_at={msg.created_at} />
                    ))
                  }
                </>
              )}

            </Grid>
            {(anonMsg.length === 0 && !loading) && <NoMessages />}
          </Box>
        }

      </Box >
      <Footer />

    </>
  )
}
