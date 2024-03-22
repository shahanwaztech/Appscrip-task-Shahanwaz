'use client'
import React, {useState} from 'react';
import {useAuth} from "@/context/AuthContext";

interface LoginInterface {
    username: string,
    password: string,
}

const Login: React.FC<any> = () => {

    const [params, setParams] = useState<LoginInterface>({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<Boolean>(false);
    const {login} = useAuth();

    const setParam = (key: string, value: string) => {
        setParams({
            ...params,
            [key]: value
        });
    };

    return (
        <>
            <div className="flex justify-center items-center h-[100vh] w-[100vw]">
                <div className="h-[300px] w-[500px] rounded-lg shadow-lg p-[25px]">
                    <h1 className="text-[#1A1A1A] font-semibold text-[30px] text-center">Login</h1>
                    <div className="flex flex-col gap-[20px] mt-[20px] w-[100%]">
                        <input className="border border-[#1a1a1a] rounded  p-[10px]"
                               type="text" placeholder="Username"
                               value={params.username} onChange={e => setParam("username", e.target.value)}
                               required
                        />
                        <div
                            className={`flex flex-row justify-between items-center rounded p-[10px] ${isInputFocused ? "border-2 border-[#1a1a1a]" : "border border-[#1a1a1a]"}`}>
                            <input
                                className="w-[90%] outline-0"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={params.password}
                                onChange={(e) => setParam("password", e.target.value)}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                required
                            />
                            <div>
                                {!showPassword ? (
                                    <a onClick={() => setShowPassword(true)}>
                                        <img src="/hide.png" alt="Eye" className="w-[20px] cursor-pointer"/>
                                    </a>
                                ) : (
                                    <a onClick={() => setShowPassword(false)}>
                                        <img src="/view.png" alt="Eye" className="w-[20px] cursor-pointer"/>
                                    </a>
                                )}
                            </div>
                        </div>

                        <button onClick={async () => {
                            await login(params)
                        }}
                                className="bg-[#1A1A1A] text-white rounded-md py-[10px] mt-[10px] text-[18px]">Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
