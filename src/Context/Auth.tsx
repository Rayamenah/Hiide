import React, { useContext, useEffect, useState, createContext } from "react"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { firebaseDb, authenticate } from "../Utils/firebaseConfig"

interface Props {
    children: React.ReactNode
}

type ContextProps = {
    user: any;
    loading: boolean;
    signedIn: boolean;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<any>>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setSignedIn: React.Dispatch<any>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}
const AuthContext = createContext<ContextProps>({
    signedIn: false,
    user: null,
    loading: true,
    usernam: "",
    setUserName: null,
    setSignedIn: null,
    setUser: null,
    setLoading: null

})

const Auth = (props: Props) => {
    const { children } = props;
    const [signedIn, setSignedIn] = useState<any | null>(false);
    const [username, setUsername] = useState("")
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const auth = authenticate
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
                username,
                setUsername,
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