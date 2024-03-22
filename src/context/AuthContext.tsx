'use client'
import React, {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface User {
    username: string;
    password: string;
}

interface AuthContextProps {
    user: string | null;
    login: (params: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {
    },
    logout: () => {
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    const login = async (params: User) => {
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                console.error('Network response was not ok');
                return;
            }

            const json = await response.json();
            console.log(json);
            router.push("/");
            setUser(json.token);
            localStorage.setItem("user", json.token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
