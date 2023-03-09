import React, { useContext, useEffect, useState, createContext } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { authenticate } from "../Utils/firebaseConfig"

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
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}
const AuthContext = createContext<ContextProps>({
    signedIn: false,
    user: null,
    loading: true,
    username: "",
    setUserName: null,
    setSignedIn: null,
    setUser: null,
    setLoading: false

})

const Auth = (props: Props) => {
    const { children } = props;
    const [signedIn, setSignedIn] = useState(false);
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