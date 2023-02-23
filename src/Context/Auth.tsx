import React, { useContext, useEffect, useState, createContext } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { firebaseDb, authenticate } from "../Utils/firebaseConfig"

interface Props {
    children: React.ReactNode
}

type ContextProps = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<null>>;
    signedIn: boolean;
    // username: string;
    // setUsername: React.Dispatch<React.SetStateAction<any>>;
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthContext = createContext<ContextProps>({
    signedIn: false,
    user: null,
    loading: true,
    setSignedIn: null,
    setUser: null,
    setLoading: null

})

const Auth = (props: Props) => {
    const { children } = props;
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const authe = authenticate
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
            }
            setLoading(false)
            setSignedIn(!!user)
        })
    }, [])
    return (
        <AuthContext.Provider
            value={{
                user,
                signedIn,
                loading,
                setSignedIn,
                setUser,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}
export default Auth