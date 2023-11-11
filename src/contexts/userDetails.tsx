import React, { useState, createContext, useMemo } from 'react'

const UserContext = createContext<{ username: string | null, setUsername: React.Dispatch<React.SetStateAction<string | null>> }>
    ({ username: null, setUsername: ()=>null});

type UserProviderProps = React.FC<{ children: React.ReactNode | undefined }>


const UserProvider: UserProviderProps = (props) => {
    const { children } = props

    const [username, setUsername] = useState<string | null>(null)

    const value = useMemo((): { username: string | null, setUsername: React.Dispatch<React.SetStateAction<string | null>> } => ({ username, setUsername }), [username])

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider }